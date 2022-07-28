import { useEffect, useMemo, useRef, useState } from "react";

import Box from "zmp-framework/react/box";
import Button from "zmp-framework/react/button";
import Checkbox from "zmp-framework/react/checkbox";
import Input from "zmp-framework/react/input";
import Sheet from "zmp-framework/react/sheet";
import Text from "zmp-framework/react/text";
import Title from "zmp-framework/react/title";
import List from "zmp-framework/react/list";
import Radio from "zmp-framework/react/radio";
import ListInput from "zmp-framework/react/list-input";

import store, { orderOfStore } from "../store";
import Notch from "../components/notch";
import { createPortal } from "react-dom";
import { imgUrl } from "../utils/imgUrl";
import ImageRatio from "../components/img-ratio";
import { CartProduct, Product } from "../models";
import { productResultDummy } from "../dummy/product-result";
import { zmp } from "zmp-framework/react/lite";
import ButtonFixed from "../components/button-fixed";
import cx from "../utils/cx";
import { useStore } from "zmp-framework/react";

const Note = () => (
  <Box m="4" mb="6">
    <Title size="small" className="mb-4">
      Ghi chú
    </Title>
    <ListInput
      id="note"
      wrap={false}
      type="text"
      placeholder="Nhập ghi chú (VD. Ít đá, nhiều đường...)"
      clearButton
      name="note"
      inputStyle={{
        backgroundColor: "white",
        width: "100%",
        minHeight: "0",
      }}
    />
  </Box>
);

function ProductPicker({ zmproute, zmprouter }) {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState<number>(-1);
  const [storeId, setStoreId] = useState<number>(-1);
  const cart: orderOfStore[] = useStore("cart");
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [sheetOpened, setSheetOpened] = useState(false);

  const product: Product | undefined = useMemo(() => {
    if (zmproute.query) {
      const { productId, storeId } = zmproute.query;
      setStoreId(storeId);
      setProductId(productId);
      return productResultDummy[productId];
    }
    return undefined;
  }, []);

  const cartProduct: CartProduct | undefined = useMemo(() => {
    const indexStore = cart.findIndex((store) => store.storeId == storeId);
    const indexOrder = cart[indexStore]?.listOrder.findIndex((ord) => {
      return ord.id == productId;
    });

    if (indexOrder >= 0) {
      return cart[indexStore].listOrder[indexOrder];
    } else return undefined;
  }, [productId, storeId]);

  useEffect(() => {
    if (cartProduct && sheetOpened) {
      const { quantity, ...data } = cartProduct.order;
      setQuantity(quantity);
      zmp.form.fillFromData("#product-picker-form", {
        ...data,
      });
    }
  }, [cartProduct, sheetOpened]);

  const addToStore = () => {
    const data = zmp.form.convertToData("#product-picker-form");
    data["quantity"] = quantity;
    store.dispatch("setCart", {
      storeId,
      productOrder: {
        id: productId,
        order: data,
      } as CartProduct,
    });
  };

  const [opened, setOpened] = useState(false);
  const sheet = useRef<any>(null);

  return product ? (
    <Sheet
    onSheetOpened={()=>{
      setSheetOpened(true)
    }}
      ref={sheet}
      backdrop
      closeButton
      className="overflow-auto h-auto"
      swipeToClose
      swipeToStep
      onSheetOpen={() => setOpened(true)}
      onSheetClose={() => setOpened(false)}
      title="Chọn chi tiết"
      // @ts-ignore
      style={{ paddingBottom: btnRef.current?.el.clientHeight }}
    >
      <Notch />
      <div className="w-full flex flex-row items-center justify-between overflow-hidden h-24 m-4 ">
        <div className="flex flex-row items-center">
          <div className="w-24 flex-none">
            <ImageRatio
              src={imgUrl(product.pathImg)}
              alt={"image product"}
              ratio={1}
            />
          </div>
          <div className=" p-3 pr-0">
            <div className="line-clamp-2 text-sm break-words">
              {product.nameProduct}
            </div>
            <span className=" pt-1 font-semibold text-sm text-primary">
              <span className=" font-normal text-xs text-primary">đ</span>
              {product.salePrice}
            </span>
          </div>
        </div>
      </div>

      <hr />
      <List
        form
        id="product-picker-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className=" title-type-picker">Số lượng</div>
        <div className={``}>
          <Box m={4} flex justifyContent="center" alignItems="center">
            <Button
              typeName="tertiary"
              className="w-10 rounded-full"
              onClick={() => {
                if (quantity > 1) setQuantity((q) => q - 1);
              }}
            >
              <div className="border-t border-[#667685] w-4" />
            </Button>
            <Text className="mx-4">{quantity}</Text>
            <Button
              typeName="tertiary"
              className="w-10  rounded-full"
              iconZMP="zi-plus"
              onClick={() => setQuantity((q) => q + 1)}
            ></Button>
          </Box>
        </div>

        {product.options?.map((option, index) => (
          <div key={index}>
            <div className={cx("title-type-picker")}>{option.title}</div>
            {option.option.map((type, indexType) => (
              <Box
                m={4}
                key={index + type.value}
                className={cx(
                  indexType === 0 && index === 1 && "sheet-modal-swipe-step"
                )}
              >
                <Radio
                  name={option.name}
                  value={type.value}
                  label={type.label}
                  defaultChecked={type.checked}
                />
              </Box>
            ))}
          </div>
        ))}
        <div className=" title-type-picker"></div>

        <Note />
      </List>

      {createPortal(
        <ButtonFixed
          ref={btnRef}
          listBtn={[
            {
              content: "Thanh toán",
              type: "secondary",
              onClick: () => {
                addToStore();
                zmp.views.main.router.navigate(`/payment/?storeId=${storeId}`);
              },
            },
            {
              content: "Thêm vào giỏ",
              type: "primary",
              onClick: () => {
                addToStore();
                sheet?.current?.zmpSheet().close();
              },
            },
          ]}
        >
          <Box m={0} flex justifyContent={"space-between"}>
            <div className=" text-sm">Tổng tiền</div>
            <div className=" text-lg font-medium text-primary">
              {quantity * Number(product.salePrice)} VNĐ
            </div>
          </Box>
        </ButtonFixed>,
        document.querySelector("#zmp-root")!
      )}
    </Sheet>
  ) : (
    <></>
  );
}

export default ProductPicker;
