export interface FormItemProps {
  id?: number;
  name: string;
  sort: number;
  parentId: number;
  children?: FormItemProps[];
}

export interface FormProps {
  formInline: FormItemProps;
}
