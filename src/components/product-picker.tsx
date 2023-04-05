import React, { useEffect, useMemo, useRef, useState } from "react";

import { createPortal } from "react-dom";
import ImageRatio from "../components/img-ratio";
import { CartProduct, Product } from "../models";
import ButtonFixed from "../components/button-fixed/button-fixed";
import cx from "../utils/cx";
import { convertPrice } from "../utils";
import { Box, Button, Icon, Input, Radio, Sheet, Text } from "zmp-ui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartState,
  openProductPickerState,
  productInfoPickedState,
  storeState,
} from "../state";
import { useAddProductToCart, useResetProductPicked } from "../hooks";
import { useNavigate } from "react-router-dom";

const ProductPicker = () => {
  const { productId, isUpdate } = useRecoilValue(productInfoPickedState);
  const [openSheet, setOpenSheet] = useRecoilState<boolean>(
    openProductPickerState
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, any> | undefined
  >(undefined);
  const [note, setNote] = useState("");

  const cart = useRecoilValue(cartState);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const store = useRecoilValue(storeState);
  const sheet = useRef<any>(null);

  const resetProductPicker = useResetProductPicked();
  const addProductToCart = useAddProductToCart();
  const navigate = useNavigate();

  const resetOptions = () => {
    setQuantity(1);
    setNote("");
    setSelectedOptions(undefined);
  };

  const product: Product | undefined = useMemo(() => {
    if (store) {
      const currentProduct = store.listProducts.find(
        (item) => item.id === Number(productId)
      );
      return currentProduct;
    }
    return undefined;
  }, [productId]);

  const cartProduct: CartProduct | undefined = useMemo(() => {
    if (product && cart) {
      const currentProductOrder = cart.listOrder.find(
        (ord) => ord.id === product.id
      );

      if (currentProductOrder) {
        return { ...currentProductOrder };
      }
    }
    return undefined;
  }, [product, cart]);

  useEffect(() => {
    if (product && product.options && !cartProduct) {
      product.options.forEach((optProduct) => {
        optProduct.option.forEach((opt) => {
          if (opt.checked) {
            setSelectedOptions((prev) => ({
              ...prev,
              [optProduct.name]: opt.value,
            }));
          }
        });
      });
    }
    if (cartProduct && openSheet) {
      const { quantity, note, ...data } = cartProduct.order;
      setQuantity(quantity);
      setNote(note || "");
      setSelectedOptions((prev) => ({ ...prev, ...data }));
    }
  }, [product, cartProduct, openSheet]);

  const addToStore = async (callback?: () => void) => {
    const productOrder = {
      quantity,
      note,
      ...selectedOptions,
    };

    addProductToCart({
      productOrder: {
        id: product!.id,
        order: productOrder,
      } as CartProduct,
    });

    setOpenSheet(false);
    callback?.();
  };

  const deleteProductInCart = () => {
    const productOrder = {
      quantity: 0,
      note,
      ...selectedOptions,
    };
    addProductToCart({
      productOrder: {
        id: product!.id,
        order: productOrder,
      } as CartProduct,
    });
    setOpenSheet(false);
  };

  const noteComponent = useMemo(
    () => (
      <>
        <div className="title-type-picker">Ghi chú</div>
        <div className="m-4">
          <Input
            type="text"
            placeholder="Nhập ghi chú (VD. Ít đá, nhiều đường...)"
            clearable
            name="note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
      </>
    ),
    [note]
  );

  return (
    <>
      {product && (
        <Sheet
          mask
          visible={openSheet}
          swipeToClose
          maskClosable
          onClose={() => setOpenSheet(false)}
          afterClose={() => {
            resetProductPicker();
            resetOptions();
          }}
          ref={sheet}
          autoHeight
          defaultSnapPoint={product.options.length > 0 ? 0 : 1}
          snapPoints={product.options.length > 0 ? [0.2, 0] : [0]}
          title="Chọn chi tiết"
        >
          <div className="overflow-y-auto overflow-x-hidden pb-32">
            <div className="w-full flex flex-row items-center justify-between overflow-hidden h-24 m-4 ">
              <div className="flex flex-row items-center">
                <div className="w-24 flex-none">
                  <ImageRatio
                    src={product.imgProduct}
                    alt="image product"
                    ratio={1}
                  />
                </div>
                <div className=" p-3 pr-0">
                  <div className="line-clamp-2 text-sm break-words">
                    {product.nameProduct}
                  </div>
                  <span className=" pt-1 font-semibold text-sm text-primary">
                    <span className=" font-normal text-xs text-primary">đ</span>
                    {convertPrice(product.salePrice)}
                  </span>
                </div>
              </div>
            </div>
            <hr />

            <div className=" title-type-picker">Số lượng</div>
            <div className="">
              <Box m={4} flex justifyContent="center" alignItems="center">
                <Button
                  variant="tertiary"
                  size="small"
                  icon={
                    <div className="w-full h-full flex justify-center items-center">
                      <div className="border-t border-black w-full" />
                    </div>
                  }
                  onClick={() => {
                    if (quantity > 0) setQuantity((q) => q - 1);
                  }}
                />
                <Text className="mx-4">{quantity}</Text>

                <Button
                  variant="tertiary"
                  size="small"
                  icon={<Icon icon="zi-plus" />}
                  onClick={() => setQuantity((q) => q + 1)}
                />
              </Box>
            </div>

            {selectedOptions &&
              product.options?.map((option, index) => (
                <div key={option.name}>
                  <div className={cx("title-type-picker")}>{option.title}</div>
                  <Radio.Group
                    onChange={(val) => {
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [option.name]: val,
                      }));
                    }}
                    defaultValue={selectedOptions?.[option.name] as string}
                    name={option.name}
                  >
                    {option.option.map((type, indexType) => (
                      <Box
                        m={4}
                        key={type.value}
                        className={cx(
                          indexType === 0 &&
                            index === 1 &&
                            "sheet-modal-swipe-step"
                        )}
                      >
                        <Radio
                          name={option.name}
                          value={type.value}
                          label={type.label}
                        />
                      </Box>
                    ))}
                  </Radio.Group>
                </div>
              ))}

            {noteComponent}
            <div className="title-type-picker h-5" />
            {createPortal(
              <ButtonFixed
                ref={btnRef}
                hidden={!openSheet}
                listBtn={[
                  {
                    id: 1,
                    content: isUpdate ? "Xoá sản phẩm" : "Thanh toán",
                    type: "secondary",
                    onClick: () => {
                      if (isUpdate) {
                        deleteProductInCart();
                      } else {
                        addToStore(() =>
                          setTimeout(() => {
                            navigate("/finish-order");
                          }, 100)
                        );
                      }
                    },
                  },
                  {
                    id: 2,
                    content:
                      isUpdate || cartProduct?.order?.quantity! >= 1
                        ? "Cập nhật"
                        : "Thêm vào giỏ",
                    type: "primary",
                    onClick: () => {
                      addToStore();
                    },
                  },
                ]}
              >
                <Box m={0} flex justifyContent="space-between" pb={4}>
                  <div className=" text-sm">Tổng tiền</div>
                  <div className=" text-lg font-medium text-primary">
                    {convertPrice(quantity * Number(product.salePrice))} VNĐ
                  </div>
                </Box>
              </ButtonFixed>,
              document.getElementById("app")!
            )}
          </div>
        </Sheet>
      )}
    </>
  );
};

export default ProductPicker;
