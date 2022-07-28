import { ReactNode } from "react";

export type OrderStatus = "pending" | "shipping";

type Options = {
  name: string;
  title: string;
  option: {
    value: string;
    label: string;
    checked?: boolean;
  }[];
};

export type CartProduct = {
  id: number;
  order: {
    quantity: number;
    note: string;
    [key: string]: any;
  };
};

export type Product = {
  pathImg: string;
  nameProduct: string;
  salePrice: number | string;
  retailPrice: number | string;
  description: string;
  options?: Options[];
};

export type Store = {
  key: number;
  pathImg: string;
  bannerStore: string;
  nameStore: string;
  followers: number;
  address: string;
  categories: string[];
  type: "personal" | "business"
};

export type SectionProductsProps = {
  title: string;
  watchMore?: boolean;
  pathBanner?: string;
  direction?: "vertical" | "horizontal";
  colPercentage?: number;
  children?: (data: Product | Store) => ReactNode;
  data: any;
  onChoose?: () => void;
};

export type OrderStoreProps = {
  keyStore: number;
  listPickupItems: { keyItem: number; quantity: number }[];
};

export type Address = {
  city: string,
  district: string,
  ward: string,
  detail: string
}