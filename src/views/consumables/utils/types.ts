export interface ConsumableItem {
  id?: number;
  model: string;
  color: string;
  quantity: number;
  price?: number;
  isOpen: boolean;
  hasSpool: boolean;
  initialWeight: number;
  currentWeight?: number;
  isCommon: boolean;
  purchaseDate?: string;
  lastDriedDate?: string;
  productionDate?: string;
  platform?: string;
  image?: string;
  remark?: string;
  createTime?: string;
  updateTime?: string;
}

export interface FormProps {
  formInline: ConsumableItem;
}
