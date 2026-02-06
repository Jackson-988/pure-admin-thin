import { reactive } from "vue";
import type { FormRules } from "element-plus";

export const formRules = reactive<FormRules>({
  name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
  sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
});
