import { AddressFormType } from "../models";

const AddressForm: AddressFormType[] = [
  {
    name: "detail",
    label: "Số nhà, tên đường",
    type: "text",
    placeholder: "Nhập số nhà, tên đường",
    errorMessage: "Hãy nhập địa chỉ cụ thể của bạn",
    isValidate: true,
  },
  {
    name: "city",
    label: "Tỉnh, thành phố",
    type: "select",
    placeholder: "Chọn tỉnh, thành phố...",
    isValidate: false,
  },
  {
    name: "district",
    label: "Quận (huyện)",
    type: "select",
    placeholder: "Chọn quận, huyện...",
    isValidate: false,
  },
  {
    name: "ward",
    label: "Phường (xã)",
    type: "select",
    placeholder: "Chọn phường, xã...",
    isValidate: false,
  },
];

export default AddressForm;
