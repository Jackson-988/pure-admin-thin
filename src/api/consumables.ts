import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type ConsumableResult = {
  success: boolean;
  data: {
    id: number;
    model: string;
    color: string;
    quantity: number;
    price: number;
    isOpen: boolean;
    hasSpool: boolean;
    initialWeight: number;
    currentWeight?: number;
    isCommon: boolean;
    purchaseDate: string;
    lastDriedDate: string;
    productionDate: string;
    platform: string;
    remark: string;
    createTime: string;
    updateTime: string;
  };
};

export type CreateConsumableData = {
  model: string;
  color: string;
  quantity?: number;
  price?: number;
  isOpen?: boolean;
  hasSpool?: boolean;
  initialWeight: number;
  currentWeight?: number;
  isCommon?: boolean;
  purchaseDate?: string;
  lastDriedDate?: string;
  productionDate?: string;
  platform?: string;
  remark?: string;
};

export const getConsumables = () => {
  return http.request<any>("get", baseUrlApi("consumables"));
};

export const createConsumable = (data: CreateConsumableData) => {
  return http.request<ConsumableResult>("post", baseUrlApi("consumables"), {
    data
  });
};

export const updateConsumable = (id: number, data: CreateConsumableData) => {
  return http.request<ConsumableResult>(
    "patch",
    baseUrlApi(`consumables/${id}`),
    { data }
  );
};

export const deleteConsumable = (id: number) => {
  return http.request<any>("delete", baseUrlApi(`consumables/${id}`));
};

export const recognizeImage = (url: string) => {
  return http.request<any>("post", baseUrlApi("consumables/recognize"), {
    data: { url }
  });
};

// 耗材记录 API
export type CreateLogData = {
  consumableId: number;
  weight: number;
  type?: string;
  remark?: string;
};

export const getConsumableLogs = (consumableId: number) => {
  return http.request<any>(
    "get",
    baseUrlApi(`consumables/log/${consumableId}`)
  );
};

export const createConsumableLog = (data: CreateLogData) => {
  return http.request<any>("post", baseUrlApi("consumables/log"), { data });
};
