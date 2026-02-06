<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(
  defineProps<FormProps & { categoryOptions?: any[] }>(),
  {
    formInline: () => ({
      name: "",
      sort: 0,
      parentId: 0
    }),
    categoryOptions: () => []
  }
);

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="上级品牌">
      <el-cascader
        v-model="newFormInline.parentId"
        :options="categoryOptions"
        :props="{
          value: 'id',
          label: 'name',
          emitPath: false,
          checkStrictly: true
        }"
        class="w-full"
        clearable
        placeholder="请选择上级品牌（不选则为顶级品牌）"
      >
        <template #default="{ node, data }">
          <span>{{ data.name }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
    </el-form-item>

    <el-form-item label="名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入品牌/型号名称"
      />
    </el-form-item>

    <el-form-item label="排序" prop="sort">
      <el-input-number
        v-model="newFormInline.sort"
        :min="0"
        :max="9999"
        controls-position="right"
      />
    </el-form-item>
  </el-form>
</template>
