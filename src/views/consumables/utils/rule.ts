import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  model: [{ required: true, message: "请选择耗材型号", trigger: "change" }],
  color: [{ required: true, message: "请选择颜色", trigger: "change" }],
  quantity: [{ required: true, message: "请输入数量", trigger: "blur" }],
  initialWeight: [
    { required: true, message: "请输入初始重量", trigger: "blur" }
  ]
});
