import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Icon, useStore, zmp } from 'zmp-framework/react';
import Page from 'zmp-framework/react/page';
import Box from 'zmp-framework/react/box';
import Text from 'zmp-framework/react/text';
import List from 'zmp-framework/react/list';
import ListInput from 'zmp-framework/react/list-input';
import CardStore from '../components/card-item/card-store';
import ImageRatio from '../components/img-ratio';
import AddressForm from '../constants/address-form';
import ButtonFixed from '../components/button-fixed';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';
import { Address, orderOfStore, Store } from '../models';
import { calcTotalPriceOrder, convertPrice, getImgUrl, setHeader } from '../utils';
import { pay } from '../services/zalo';
import { locationVN, productResultDummy } from '../dummy';

const CardProduct = ({ pathImg, nameProduct, salePrice, quantity }) => (
  <div className="w-full flex flex-row items-center justify-between gap-1 border border-[#E4E8EC] rounded-lg overflow-hidden h-24 p-2 mt-2 bg-white">
    <div className="flex flex-row items-center gap-1">
      <div className="flex-none w-20 rounded-lg overflow-hidden">
        <ImageRatio src={getImgUrl(pathImg)} alt="image product" ratio={1} />
      </div>
      <Box p={0} m={0} className=" flex-none relative w-5 h-5 rounded-full bg-slate-100">
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
      {convertPrice(salePrice)}
    </span>
  </div>
);

const FinishOrder = () => {
  const cart: orderOfStore[] = useStore('cart');
  const stores: Store[] = useStore('store');
  const address: Address = useStore('address');
  const latlong: Address = useStore('latlong');
  const [currentDistricts, setCurrentDistricts] = useState<any>();
  const [currentWards, setCurrentWards] = useState<any>();
  const [orderInfo, setOrderInfo] = useState<orderOfStore>();
  const [changeForm, setChangeForm] = useState<Address | null>(null);

  const checkInitialFillForm = useRef<boolean>(true);

  useEffect(() => {
    const { id } = zmp.views.main.router.currentRoute.query;
    const indexOrder = cart.findIndex((order) => order.orderId === Number(id));
    setOrderInfo(cart[indexOrder]);
    // if (!latlong) requestLocation();
  }, []);

  const handleOnSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    await pay(1000000);
  };

  useEffect(() => {
    if (orderInfo) {
      let currentAddress: Address;
      if (!changeForm) currentAddress = address;
      else currentAddress = changeForm;
      const { city, district } = currentAddress;
      const indexCity = Number(city) - 1 > -1 ? Number(city) - 1 : 0;
      const indexDistrict = locationVN[indexCity].districts.findIndex(
        (currentDistrict) => currentDistrict.id === district
      );
      setCurrentDistricts(locationVN[indexCity]?.districts);
      setCurrentWards(
        locationVN[indexCity].districts[indexDistrict > -1 ? indexDistrict : 0].wards
      );
    }
  }, [orderInfo, address, changeForm]);

  useEffect(() => {
    if (currentDistricts && currentWards && checkInitialFillForm.current) {
      zmp.form.fillFromData('#input-address-form', {
        district: address.district,
        city: address.city,
        ward: address.ward,
      });
      checkInitialFillForm.current = false;
    }
  }, [currentDistricts, currentWards]);

  return (
    <Page
      ptr
      name="finish-order"
      onPageBeforeIn={() => {
        hideNavigationBar();
        setHeader({ title: 'Đơn đặt hàng', headerColor: 'white', textColor: 'black' });
      }}
      onPageBeforeOut={showNavigationBar}
    >
      {orderInfo && address && (
        <div className=" mb-[80px]">
          <Box m={0} p={4} className=" bg-white">
            <CardStore
              store={stores[orderInfo.storeId]}
              hasRightSide={false}
              hasBorderBottom={false}
              type="order"
            />
          </Box>
          <Box mx={3} mb={2}>
            {orderInfo.listOrder.map((product) => {
              const productInfo = productResultDummy[product.id];
              return (
                <CardProduct
                  pathImg={productInfo.pathImg}
                  nameProduct={productInfo.nameProduct}
                  salePrice={productInfo.salePrice}
                  quantity={product.order.quantity}
                  key={productInfo.id}
                />
              );
            })}
          </Box>
          <Box m={4} flex flexDirection="row" justifyContent="space-between">
            <span className=" text-base font-medium">Đơn hàng</span>
            <span className=" text-base font-medium text-primary">
              {convertPrice(calcTotalPriceOrder(orderInfo.listOrder).toString())}đ
            </span>
          </Box>
          <Box m={0} p={4} className=" bg-white">
            <List
              style={{ listStyle: 'none' }}
              form
              id="input-address-form"
              noHairlines
              onSubmit={handleOnSubmitForm}
            >
              {AddressForm.map((item) => {
                let listOptions: any = locationVN;
                switch (item.name) {
                  case 'city':
                    listOptions = locationVN;
                    break;
                  case 'district':
                    listOptions = currentDistricts;
                    break;
                  case 'ward':
                    listOptions = currentWards;
                    break;
                  default:
                    listOptions = locationVN;
                    break;
                }
                return (
                  <div key={item.name}>
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
                        clearButton={item.type === 'text'}
                        name={item.name}
                        validate={item.isValidate}
                        required
                        errorMessage={item.errorMessage || ''}
                        inputStyle={{
                          width: '100%',
                          lineHeight: '20px',
                          height: 'fit-content',
                          padding: '8px',
                          border: 'unset',
                          transform: 'translateX(-8px)',
                        }}
                        onChange={() => {
                          if (item.type !== 'text' && !checkInitialFillForm.current)
                            setChangeForm(zmp.form.convertToData('#input-address-form') as Address);
                        }}
                      >
                        {item.type === 'select' && (
                          <option value="" disabled hidden className=" text-gray-50">
                            {item.placeholder}
                          </option>
                        )}
                        {item.type === 'select' &&
                          listOptions?.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </ListInput>
                      {item.type === 'select' && (
                        <div className="center-absolute right-2">
                          <Icon zmp="zi-chevron-down" className="pointer-events-none" size={20} />
                        </div>
                      )}
                    </Box>
                  </div>
                );
              })}

              <ButtonFixed>
                <button type="submit" className=" bg-primary text-white rounded-lg h-12">
                  Đặt hàng
                </button>
              </ButtonFixed>
            </List>
          </Box>
          <Text className=" p-4 text-center">
            Đặt hàng đồng nghĩa với việc bạn đồng ý quan tâm Big C Việt Nam để nhận tin tức mới
          </Text>
        </div>
      )}
    </Page>
  );
};

export default FinishOrder;
