<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { getConsumableLogs, createConsumableLog } from "@/api/consumables";
import { message } from "@/utils/message";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "~icons/ri/add-circle-line";

const props = defineProps<{
  visible: boolean;
  data: any;
}>();

const emit = defineEmits(["update:visible", "refresh"]);

const loading = ref(false);
const logList = ref([]);
const dialogVisible = ref(false);

const formRef = ref();
const form = reactive({
  weight: undefined,
  type: "手动记录",
  remark: ""
});

const rules = {
  weight: [{ required: true, message: "请输入使用重量", trigger: "blur" }]
};

watch(
  () => props.visible,
  val => {
    dialogVisible.value = val;
    if (val && props.data?.id) {
      loadLogs();
    }
  }
);

watch(
  () => dialogVisible.value,
  val => {
    emit("update:visible", val);
  }
);

async function loadLogs() {
  loading.value = true;
  try {
    const { data } = await getConsumableLogs(props.data.id);
    logList.value = data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

async function handleAdd() {
  if (!form.weight) {
    message("请输入重量", { type: "warning" });
    return;
  }

  // 默认是消耗，所以是负数。如果用户输入正数，我们这里自动转为负数
  // 或者我们可以让用户选择是“使用”还是“补充”
  // 这里简化逻辑：默认是“使用记录”，输入正数表示用了多少克，提交时转为负数
  const changeWeight = -Math.abs(form.weight);

  try {
    await createConsumableLog({
      consumableId: props.data.id,
      weight: changeWeight,
      type: form.type,
      remark: form.remark
    });
    message("记录添加成功", { type: "success" });
    form.weight = undefined;
    form.remark = "";
    loadLogs();
    emit("refresh"); // 刷新父列表以更新当前重量
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`使用记录 - ${props.data?.model || ''}`"
    width="600px"
    destroy-on-close
  >
    <div class="mb-4 p-4 border rounded bg-gray-50">
      <h4 class="mb-3 font-bold text-gray-700">添加使用记录</h4>
      <el-form ref="formRef" :inline="true" :model="form" :rules="rules">
        <el-form-item label="使用重量(g)" prop="weight">
          <el-input-number
            v-model="form.weight"
            :min="1"
            placeholder="消耗量"
            style="width: 120px"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="选填" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="handleAdd"
          >
            记录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="text-xs text-gray-500 mt-1">
        注：输入消耗的重量（克），系统将自动从当前重量中扣除。
      </div>
    </div>

    <el-table v-loading="loading" :data="logList" height="400" stripe>
      <el-table-column prop="createTime" label="时间" width="180">
        <template #default="{ row }">
          {{ row.createTime?.replace("T", " ").split(".")[0] }}
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="变动(g)" width="100">
        <template #default="{ row }">
          <span :class="row.weight < 0 ? 'text-red-500' : 'text-green-500'">
            {{ row.weight > 0 ? "+" : "" }}{{ row.weight }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column prop="remark" label="备注" show-overflow-tooltip />
    </el-table>

    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>
