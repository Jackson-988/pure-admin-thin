import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getConsumables,
  createConsumable,
  updateConsumable,
  deleteConsumable
} from "@/api/consumables";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h } from "vue";
import type { ConsumableItem } from "./types";
import { ElMessageBox } from "element-plus";

export function useConsumable() {
  const form = reactive({
    model: ""
  });

  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const logDialogVisible = ref(false);
  const currentLogConsumable = ref({});

  const columns: TableColumnList = [
    {
      label: "ID",
      prop: "id",
      width: 60
    },
    {
      label: "图片",
      prop: "image",
      width: 80,
      cellRenderer: ({ row }) => (
        <el-image
          src={row.image}
          style="width: 40px; height: 40px; border-radius: 4px"
          preview-src-list={[row.image]}
          preview-teleported
          fit="cover"
        />
      )
    },
    {
      label: "耗材型号",
      prop: "model"
    },
    {
      label: "颜色",
      prop: "color"
    },
    {
      label: "数量",
      prop: "quantity",
      width: 80
    },
    {
      label: "价格",
      prop: "price",
      width: 100,
      formatter: ({ price }) => (price ? `¥${price}` : "-")
    },
    {
      label: "初始重量",
      prop: "initialWeight",
      width: 100,
      formatter: ({ initialWeight }) => `${initialWeight}g`
    },
    {
      label: "当前重量",
      prop: "currentWeight",
      width: 100,
      formatter: ({ currentWeight }) =>
        currentWeight !== null && currentWeight !== undefined
          ? `${currentWeight}g`
          : "-"
    },
    {
      label: "状态",
      width: 150,
      cellRenderer: ({ row }) => (
        <>
          <el-tag
            size="small"
            type={row.isOpen ? "warning" : "success"}
            class="mr-1"
          >
            {row.isOpen ? "已开封" : "未开封"}
          </el-tag>
          <el-tag size="small" type={row.hasSpool ? "primary" : "info"}>
            {row.hasSpool ? "有盘" : "无盘"}
          </el-tag>
        </>
      )
    },
    {
      label: "购买平台",
      prop: "platform"
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: 180
    },
    {
      label: "操作",
      fixed: "right",
      width: 150,
      slot: "operation"
    }
  ];

  async function onSearch() {
    loading.value = true;
    try {
      const res = await getConsumables();
      dataList.value = res.list || (Array.isArray(res) ? res : res.data || []);
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

  function openDialog(title = "新增", row?: ConsumableItem) {
    const formInline: ConsumableItem = {
      id: row?.id,
      model: row?.model ?? "",
      color: row?.color ?? "",
      image: row?.image ?? "",
      quantity: row?.quantity ?? 1,
      price: row?.price,
      isOpen: row?.isOpen ?? false,
      hasSpool: row?.hasSpool ?? false,
      initialWeight: row?.initialWeight ?? 1000,
      isCommon: row?.isCommon ?? false,
      purchaseDate: row?.purchaseDate ?? "",
      lastDriedDate: row?.lastDriedDate ?? "",
      productionDate: row?.productionDate ?? "",
      platform: row?.platform ?? "",
      remark: row?.remark ?? ""
    };

    addDialog({
      title: `${title}耗材`,
      props: {
        formInline
      },
      width: "500px",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as ConsumableItem;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createConsumable(curData).then(() => {
                message("新增成功", { type: "success" });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              });
            } else {
              updateConsumable(curData.id, curData).then(() => {
                message("修改成功", { type: "success" });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              });
            }
          }
        });
      }
    });
  }

  async function handleDelete(row) {
    try {
      await ElMessageBox.confirm(
        `确定删除型号为 ${row.model} 的耗材吗？`,
        "提示",
        {
          type: "warning"
        }
      );
      await deleteConsumable(row.id);
      message("删除成功", { type: "success" });
      onSearch();
    } catch {
      // Cancelled or failed
    }
  }

  function openLogDialog(row) {
    currentLogConsumable.value = row;
    logDialogVisible.value = true;
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    logDialogVisible,
    currentLogConsumable,
    onSearch,
    resetForm,
    openDialog,
    openLogDialog,
    handleDelete
  };
}
