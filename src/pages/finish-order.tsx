import { useEffect, useState } from "react";
import { Icon, useStore, zmp } from "zmp-framework/react";
import { orderOfStore } from "../store";
import Page from "zmp-framework/react/page";
import {
  hideNavigationBar,
  showNavigationBar,
} from "../components/navigation-bar";
import Box from "zmp-framework/react/box";
import Text from "zmp-framework/react/text";
import List from "zmp-framework/react/list";
import ListInput from "zmp-framework/react/list-input";
import CardStore from "../components/card-item/card-store";
import { Address, Store } from "../models";
import ImageRatio from "../components/img-ratio";
import { imgUrl } from "../utils/imgUrl";
import { productResultDummy } from "../dummy/product-result";
import { locationVN } from "../dummy/location";
import { calcTotalPriceOrder } from "../utils/math";
import { AddressForm } from "../constants/address-form";
import ButtonFixed from "../components/button-fixed";

const CardProduct = ({ pathImg, nameProduct, salePrice, quantity }) => (
  <div className="w-full flex flex-row items-center justify-between gap-1 border border-[#E4E8EC] rounded-lg overflow-hidden h-24 p-2 mt-2 bg-white">
    <div className="flex flex-row items-center gap-1">
      <div className="flex-none w-20 rounded-lg overflow-hidden">
        <ImageRatio src={imgUrl(pathImg)} alt={"image product"} ratio={1} />
      </div>
      <Box
        p={0}
        m={0}
        className=" flex-none relative w-5 h-5 rounded-full bg-slate-100"
      >
        <div className=" absolute top-1/2 -translate-y-1/2 w-full text-center text-xs text-blue-700 ">
          {quantity}
        </div>
      </Box>
      <Box m={0} className="flex-none text-slate-500">
        x
      </Box>
      <div>
        <div className="line-clamp-2 text-sm break-words">{nameProduct}</div>
      </div>
    </div>
    <span className=" pt-1 font-semibold text-sm">
      <span className=" font-normal text-xs">đ</span>
      {salePrice}
    </span>
  </div>
);

const FinishOrder = (props) => {
  const cart = useStore("cart");
  const stores: Store[] = useStore("store");
  const address: Address = useStore("address");
  const [currentCity, setCurrentCity] = useState<any>(null);
  const [currentDistrict, setCurrentDistrict] = useState<string>("");
  const [orderInfo, setOrderInfo] = useState<orderOfStore>();
  useEffect(() => {
    const { id } = zmp.views.main.router.currentRoute.query;
    const indexOrder = cart.findIndex((order) => order.storeId == id);
    setOrderInfo(cart[indexOrder]);
  }, []);

  console.log(orderInfo);
  console.log(locationVN);
  console.log(address);

  const handleOnSubmitForm = (e) => {
    e.preventDefault();
    console.log(zmp.form.convertToData("#input-address-form"));
  };

  useEffect(() => {
    if (orderInfo && address) {
      zmp.form.fillFromData("#input-address-form", {
        city: address.city,
        district: address.district,
      });
      setCurrentCity(locationVN[Number(address.city) - 1]);
      //   setCurrentDistrict(locationVN[Number(address.city) - 1])
    } else {
      zmp.form.fillFromData("#input-address-form", {
        city: "",
        district: "",
      });
      setCurrentCity({ ...locationVN[0] });
    }
  }, [orderInfo, address]);
  return (
    <Page
      ptr
      name="finish-order"
      onPageBeforeIn={() => {
        hideNavigationBar();
      }}
      onPageBeforeOut={showNavigationBar}
    >
      {orderInfo && (
        <>
          <Box m={0} p={4} className=" bg-white">
            <CardStore
              store={stores[orderInfo.storeId]}
              hasRightSide={false}
              hasBorderBottom={false}
              type="order"
            />
          </Box>
          <Box mx={3} mb={2}>
            {orderInfo.listOrder.map((product, index) => {
              const productInfo = productResultDummy[product.id];
              return (
                <CardProduct
                  pathImg={productInfo.pathImg}
                  nameProduct={productInfo.nameProduct}
                  salePrice={productInfo.salePrice}
                  quantity={product.order.quantity}
                  key={index}
                />
              );
            })}
          </Box>
          <Box
            m={4}
            flex
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <span className=" text-base font-medium">Đơn hàng</span>
            <span className=" text-base font-medium text-primary">
              {calcTotalPriceOrder(orderInfo.listOrder).toString()}đ
            </span>
          </Box>
          <Box m={0} p={4} className=" bg-white">
            <List
              style={{ listStyle: "none" }}
              form
              id="input-address-form"
              noHairlines
              onSubmit={handleOnSubmitForm}
            >
              {AddressForm.map((item, index) => {
                var listOptions: any = locationVN;
                switch (item.name) {
                  case "city":
                    listOptions = locationVN;
                    break;
                  case "district":
                    listOptions =
                      locationVN[Number(address.city) - 1 || 0].districts;
                    console.log("listOptions district", listOptions);
                    break;

                  case "ward":
                    const index = locationVN[
                      Number(address.city) - 1
                    ].districts.findIndex(
                      (district) => district.id == address.district
                    );
                    listOptions =
                      locationVN[Number(address.city) - 1].districts[index]
                        ?.wards;
                    console.log("listOptions ward", listOptions);
                    break;
                  default:
                    listOptions = locationVN;
                    break;
                }
                return (
                  <>
                    <Text
                      size="large"
                      bold
                      className=" after:content-['_*'] after:text-primary after:align-middle"
                    >
                      {item.label}
                    </Text>
                    <Box className="relative" m={0}>
                      <ListInput
                        id={item.name}
                        wrap={false}
                        type={item.type}
                        placeholder="Nhập ghi chú (VD. Ít đá, nhiều đường...)"
                        clearButton={item.type === "text"}
                        name={item.name}
                        validate={item.isValidate}
                        required
                        errorMessage={item.errorMessage || ""}
                        inputStyle={{
                          width: "100%",
                          lineHeight: "20px",
                          height: "fit-content",
                          padding: "8px",
                          border: "unset",
                          transform: "translateX(-8px)",
                        }}
                      >
                        {item.type === "select" && (
                          <option
                            value=""
                            disabled
                            hidden
                            className=" text-gray-50"
                          >
                            {item.placeholder}
                          </option>
                        )}
                        {item.type === "select" &&
                          listOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </ListInput>
                      {item.type === "select" && (
                        <div className="center-absolute right-2">
                          <Icon
                            zmp="zi-chevron-down"
                            className="pointer-events-none"
                            size={20}
                          ></Icon>
                        </div>
                      )}
                    </Box>
                  </>
                );
              })}
            </List>
            {/* <Box m={0}>
                <Text
                  size="large"
                  bold
                  className=" after:content-['_*'] after:text-primary after:align-middle"
                >
                  Tỉnh, thành phố
                </Text>
                <Box className="relative" m={0} mb={10}>
                  <ListInput
                    type="select"
                    name="city"
                    required
                    inputStyle={{
                      lineHeight: "20px",
                      height: "fit-content",
                      padding: "8px",
                      border: "unset",
                      transform: "translateX(-8px)",
                      color: address.city ? "black" : "#99A3AD",
                    }}
                  >
                    <option value="" disabled hidden className=" text-gray-50">
                      Chọn tỉnh, thành phố...
                    </option>
                    <option value="1">Hồ Chí Minh</option>
                    <option value="2">Hà Nội</option>
                  </ListInput>
                  <div className="center-absolute right-2">
                    <Icon
                      zmp="zi-chevron-down"
                      className="pointer-events-none"
                      size={20}
                    ></Icon>
                  </div>
                </Box>
              </Box>
              <Box className="relative">
                <ListInput
                  type="select"
                  name="district"
                  required
                  inputStyle={{
                    lineHeight: "20px",
                    height: "fit-content",
                    paddingLeft: "0",
                    paddingRight: "0",
                    border: "unset",
                  }}
                >
                  <option value="" disabled hidden>
                    Select your district
                  </option>
                  <option value="1">Quận 1</option>
                  <option value="2">Quận 2</option>
                </ListInput>
                <div className="absolute top-0 right-0">
                  <Icon
                    zmp="zi-chevron-down"
                    className="pointer-events-none"
                    size={20}
                  ></Icon>
                </div>
              </Box> */}
                  </Box>
            <Text className=" p-4 text-center">Đặt hàng đồng nghĩa với việc bạn đồng ý quan tâm Big C Việt Nam để nhận tin tức mới</Text>

            <ButtonFixed
              listBtn={[
                {
                  content: "Đặt hàng",
                  type: "primary",
                  onClick: (e) => handleOnSubmitForm(e),
                },
              ]}
            />
        </>
      )}
    </Page>
  );
};

export default FinishOrder;
