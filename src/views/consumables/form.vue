<script setup lang="ts">
import { ref, onMounted } from "vue";
import { handleTree } from "@/utils/tree";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import { Plus, MagicStick } from "@element-plus/icons-vue";
import { recognizeImage } from "@/api/consumables";
import { getCategories } from "@/api/consumable-category";
import { baseUrlApi } from "@/api/utils";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    model: "",
    color: "",
    quantity: 1,
    price: undefined,
    isOpen: false,
    hasSpool: false,
    initialWeight: 1000,
    currentWeight: 1000,
    isCommon: false,
    purchaseDate: "",
    lastDriedDate: "",
    productionDate: "",
    platform: "",
    image: "",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const recognizing = ref(false);
const categoryOptions = ref([]);

const uploadAction = baseUrlApi("consumables/upload");

function getRef() {
  return ruleFormRef.value;
}

onMounted(async () => {
  const { data } = await getCategories();
  categoryOptions.value = handleTree(data);
});

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  newFormInline.value.image = response.url;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be JPG/PNG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const handleRecognize = async () => {
  if (!newFormInline.value.image) {
    ElMessage.warning("请先上传图片");
    return;
  }

  recognizing.value = true;
  try {
    const res = await recognizeImage(newFormInline.value.image);

    // 填充颜色
    if (res && res.color) {
      newFormInline.value.color = res.color;
      ElMessage.success(`识别成功：已提取颜色 ${res.color}`);
    }

    // 填充文字信息
    if (res && res.text) {
      if (!res.color) ElMessage.success("识别成功"); // 如果没有颜色才提示这个，避免重复提示

      // 简单的关键词匹配示例
      const text = res.text.toLowerCase();

      // 匹配型号
      if (text.includes("pla basic")) newFormInline.value.model = "PLA Basic";
      else if (text.includes("pla matte"))
        newFormInline.value.model = "PLA Matte";
      else if (text.includes("petg basic"))
        newFormInline.value.model = "PETG Basic";
      else if (text.includes("abs")) newFormInline.value.model = "ABS";

      // 可以在这里添加更多逻辑，或者将识别到的原始文本放入备注
      if (!newFormInline.value.remark) {
        newFormInline.value.remark = `OCR: ${res.text.slice(0, 50)}...`;
      } else {
        newFormInline.value.remark += `\nOCR: ${res.text.slice(0, 50)}...`;
      }
    }
  } catch (error) {
    ElMessage.error("识别失败");
    console.error(error);
  } finally {
    recognizing.value = false;
  }
};

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
    class="consumable-form"
  >
    <el-row :gutter="30">
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="图片" prop="image">
          <div class="flex items-end gap-2">
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="newFormInline.image"
                :src="newFormInline.image"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>

            <el-button
              v-if="newFormInline.image"
              type="primary"
              link
              :loading="recognizing"
              @click="handleRecognize"
            >
              <el-icon class="mr-1"><MagicStick /></el-icon>
              智能识别
            </el-button>
          </div>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="耗材型号" prop="model">
          <el-cascader
            v-model="newFormInline.model"
            :options="categoryOptions"
            :props="{
              value: 'name',
              label: 'name',
              children: 'children',
              emitPath: false
            }"
            class="w-full"
            clearable
            filterable
            placeholder="请选择品牌/型号"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="颜色" prop="color">
          <div class="flex items-center gap-2">
            <el-color-picker v-model="newFormInline.color" show-alpha />
            <span class="text-sm text-gray-500">{{ newFormInline.color }}</span>
          </div>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="添加卷数" prop="quantity">
          <el-input-number
            v-model="newFormInline.quantity"
            :min="1"
            class="w-full"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="newFormInline.price" placeholder="例如 169">
            <template #suffix>¥</template>
          </el-input>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="开封状态">
          <div
            class="flex justify-between items-center w-full border rounded px-3 py-1"
          >
            <span>{{ newFormInline.isOpen ? "已开封" : "未开封" }}</span>
            <el-switch v-model="newFormInline.isOpen" />
          </div>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否有盘">
          <div
            class="flex justify-between items-center w-full border rounded px-3 py-1"
          >
            <span>{{ newFormInline.hasSpool ? "有盘" : "无盘" }}</span>
            <el-switch v-model="newFormInline.hasSpool" />
          </div>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="初始重量" prop="initialWeight">
          <el-input
            v-model.number="newFormInline.initialWeight"
            placeholder="例如 1000"
          >
            <template #suffix>g</template>
          </el-input>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="当前重量" prop="currentWeight">
          <el-input
            v-model.number="newFormInline.currentWeight"
            placeholder="例如 1000"
          >
            <template #suffix>g</template>
          </el-input>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否常用">
          <div
            class="flex justify-between items-center w-full border rounded px-3 py-1"
          >
            <span>{{ newFormInline.isCommon ? "常用" : "不常用" }}</span>
            <el-switch v-model="newFormInline.isCommon" />
          </div>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="购买日期">
          <el-date-picker
            v-model="newFormInline.purchaseDate"
            type="date"
            placeholder="选择日期"
            class="w-full"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="上次烘干">
          <el-date-picker
            v-model="newFormInline.lastDriedDate"
            type="date"
            placeholder="选择日期"
            class="w-full"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="生产日期">
          <el-date-picker
            v-model="newFormInline.productionDate"
            type="date"
            placeholder="选择日期"
            class="w-full"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="购买平台">
          <el-select
            v-model="newFormInline.platform"
            placeholder="选择购买平台"
            class="w-full"
            allow-create
            filterable
          >
            <el-option label="京东" value="JD" />
            <el-option label="淘宝" value="Taobao" />
            <el-option label="官网" value="Official" />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="备注">
          <el-input
            v-model="newFormInline.remark"
            type="textarea"
            placeholder="记录批次、打印建议或其他说明"
            maxlength="200"
            show-word-limit
            :rows="3"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped>
.w-full {
  width: 100%;
}

.avatar-uploader .avatar {
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

:deep(.avatar-uploader .el-upload) {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 100px;
  height: 100px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
