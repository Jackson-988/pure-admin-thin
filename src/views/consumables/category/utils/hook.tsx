import { ref, onMounted, reactive, h } from "vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "@/api/consumable-category";
import { handleTree } from "@/utils/tree";
import type { FormItemProps } from "./types";
import EditForm from "../form.vue";

export function useCategory() {
  const form = reactive({
    name: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  const columns: TableColumnList = [
    {
      label: "品牌/型号名称",
      prop: "name",
      align: "left"
    },
    {
      label: "排序",
      prop: "sort",
      width: 100
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: 180
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  async function onSearch() {
    loading.value = true;
    try {
      const { data } = await getCategories();
      dataList.value = handleTree(data);
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: title === "新增" ? "新增品牌" : title,
      props: {
        formInline: {
          id: row?.id,
          name: row?.name ?? "",
          sort: row?.sort ?? 0,
          parentId: row?.parentId ?? 0
          // If editing, we might need to pass the tree to disable self selection, etc.
          // But for now, let's keep it simple.
        },
        categoryOptions: dataList.value // Pass tree data for parent selection
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () =>
        h(EditForm, {
          ref: formRef,
          formInline: { name: "", sort: 0, parentId: 0 },
          categoryOptions: []
        }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            if (title === "新增" || title === "新增型号") {
              createCategory(curData).then(() => {
                message("新增成功", { type: "success" });
                done(); // Close dialog
                onSearch(); // Refresh list
              });
            } else {
              updateCategory(curData.id, curData).then(() => {
                message("修改成功", { type: "success" });
                done();
                onSearch();
              });
            }
          }
        });
      }
    });
  }

  function handleDelete(row) {
    deleteCategory(row.id).then(() => {
      message("删除成功", { type: "success" });
      onSearch();
    });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    onSearch,
    resetForm,
    openDialog,
    handleDelete
  };
}
