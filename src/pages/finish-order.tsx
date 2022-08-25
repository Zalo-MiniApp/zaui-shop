import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Icon, useStore, zmp } from 'zmp-framework/react';
import Page from 'zmp-framework/react/page';
import Box from 'zmp-framework/react/box';
import Text from 'zmp-framework/react/text';
import List from 'zmp-framework/react/list';
import ListInput from 'zmp-framework/react/list-input';
import CardStore from '../components/card-item/card-store';
import AddressForm from '../constants/address-form';
import ButtonFixed from '../components/button-fixed/button-fixed';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';
import { Address, AddressFormType, orderOfStore, Store } from '../models';
import { calcTotalPriceOrder, convertPrice, cx } from '../utils';
import { pay } from '../services/zalo';
import { locationVN } from '../dummy';
import store from '../store';
import CardProductOrder from '../components/card-item/card-product-order';
import { changeStatusBarColor } from '../services/navigation-bar';
import setHeader from '../services/header';

const FinishOrder = () => {
  const cart: orderOfStore[] = useStore('cart');
  const stores: Store[] = useStore('store');
  const address: Address = useStore('address');
  const [showAddress, setShowAddress] = useState<Address | null>(null);
  const [currentDistricts, setCurrentDistricts] = useState<any>();
  const [currentWards, setCurrentWards] = useState<any>();
  const [orderInfo, setOrderInfo] = useState<orderOfStore>();
  const [changeAddress, setChangeAddress] = useState<Address | null>(null);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const initialFillForm = useRef<boolean>(false);

  useEffect(() => {
    const { id } = zmp.views.main.router.currentRoute.query;
    const indexOrder = cart.findIndex((order) => order.orderId === Number(id));
    if (indexOrder === -1) zmp.views.main.router.navigate('/my-order', { transition: 'zmp-fade' });
    else {
      setOrderInfo(cart[indexOrder]);
      if (cart[indexOrder].status === 'finish') setReadOnly(true);
    }
  }, [cart]);

  useEffect(() => {
    if (readOnly && orderInfo) setChangeAddress(orderInfo.address!);
    else setChangeAddress(address);
  }, [readOnly, address, orderInfo]);

  const handleSubmitForm = async (e: SyntheticEvent) => {
    console.log(zmp.form.convertToData('#input-address-form') as Address);
    e.preventDefault();
    await pay(1000000);
  };
  useEffect(() => {
    if (orderInfo) {
      const { city, district, ward, detail } = changeAddress!;
      const indexCity = Number(city) - 1 > -1 ? Number(city) - 1 : 0;
      const findDistrict = locationVN[indexCity].districts.findIndex(
        (currentDistrict) => currentDistrict.id === district
      );
      const indexDistrict = findDistrict < 0 ? 0 : findDistrict;
      const findWard = locationVN[indexCity].districts[indexDistrict].wards.findIndex(
        (currentWard) => currentWard.id === ward
      );
      const indexWard = findWard < 0 ? 0 : findWard;
      setCurrentDistricts(locationVN[indexCity].districts);
      setCurrentWards(locationVN[indexCity].districts[indexDistrict].wards);
      setShowAddress({
        city,
        district: !district ? '' : locationVN[indexCity].districts[indexDistrict].id,
        ward: !ward ? '' : locationVN[indexCity].districts[indexDistrict].wards[indexWard].id,
        detail,
      });
    }
  }, [orderInfo, changeAddress]);

  useEffect(() => {
    if (currentDistricts && currentWards && showAddress) {
      initialFillForm.current = false;
      zmp.form.fillFromData('#input-address-form', {
        city: showAddress.city,
        district: showAddress.district,
        ward: showAddress.ward,
        detail: showAddress.detail,
      });
      if (!initialFillForm.current) {
        initialFillForm.current = true;
      }
    }
  }, [currentDistricts, currentWards, showAddress]);

  const handleChooseProduct = (productId: number) => {
    zmp.views.main.router.navigate({
      path: '/product-picker/',
      query: {
        productId,
        storeId: orderInfo?.storeId,
        isUpdate: 'true',
      },
    });
  };

  const filterListOptions = (item: AddressFormType) => {
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
    return listOptions;
  };
  const getStore = (cart: orderOfStore) => {
    const store: Store | undefined = stores.find((store) => store.id === cart.storeId);
    return store;
  };

  return (
    <Page
      ptr
      name="finish-order"
      onPageBeforeIn={() => {
        hideNavigationBar();
        setHeader({ title: 'Đơn đặt hàng', type: 'secondary' });
        changeStatusBarColor('secondary');
      }}
      onPageBeforeOut={() => {
        showNavigationBar();
      }}
    >
      {orderInfo && address && (
        <div className=" mb-[80px]">
          <Box m={0} p={4} className=" bg-white">
            <CardStore
              store={getStore(orderInfo)!}
              hasRightSide={false}
              hasBorderBottom={false}
              type="order"
            />
          </Box>
          <Box mx={3} mb={2}>
            {orderInfo.listOrder.map((product) => {
              const productInfo = store.state.product.find((prod) => prod.id === product.id);
              return (
                <CardProductOrder
                  pathImg={productInfo!.imgProduct}
                  nameProduct={productInfo!.nameProduct}
                  salePrice={productInfo!.salePrice}
                  quantity={product!.order.quantity}
                  key={productInfo!.id}
                  id={product.id}
                  handleOnClick={(productId) => !readOnly && handleChooseProduct(productId)}
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
          <Box m={0} px={4} className=" bg-white">
            <Text size="large" bold className=" border-b py-3 mb-0">
              Địa chỉ giao hàng
            </Text>
            <List
              style={{ listStyle: 'none' }}
              form
              id="input-address-form"
              noHairlines
              onSubmit={handleSubmitForm}
            >
              {AddressForm.map((item: AddressFormType) => {
                const listOptions = filterListOptions(item);
                return (
                  <div key={item.name} className={cx('py-3', item.name !== 'ward' && 'border-b')}>
                    <Text
                      size="large"
                      bold
                      className={cx(
                        !readOnly && "after:content-['_*'] after:text-primary after:align-middle"
                      )}
                    >
                      {item.label}
                    </Text>
                    <Box className="relative" m={0}>
                      <ListInput
                        id={item.name}
                        wrap={false}
                        type={item.type}
                        placeholder="Nhập ghi chú (VD. Ít đá, nhiều đường...)"
                        clearButton={item.type === 'text' && !readOnly}
                        name={item.name}
                        required
                        inputStyle={{
                          width: '100%',
                          lineHeight: '20px',
                          height: 'fit-content',
                          border: 'unset',
                          padding: 0,
                          boxShadow: 'none',
                          pointerEvents: readOnly ? 'none' : 'auto',
                        }}
                        onChange={() => {
                          if (
                            item.name !== 'detail' &&
                            item.name !== 'ward' &&
                            initialFillForm.current
                          ) {
                            setChangeAddress(
                              zmp.form.convertToData('#input-address-form') as Address
                            );
                          }
                        }}
                      >
                        {item.type === 'select' && (
                          <>
                            <option value="" disabled hidden style={{ display: 'none' }}>
                              {item.placeholder}
                            </option>
                            {listOptions?.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                            <div className="center-absolute right-2">
                              <Icon
                                zmp="zi-chevron-down"
                                className="pointer-events-none"
                                size={20}
                              />
                            </div>
                          </>
                        )}
                      </ListInput>
                      {item.type === 'select' && !readOnly && (
                        <div className="center-absolute right-2">
                          <Icon zmp="zi-chevron-down" className="pointer-events-none" size={20} />
                        </div>
                      )}
                    </Box>
                    {!readOnly && (
                      <ButtonFixed>
                        <button type="submit" className=" bg-primary text-white rounded-lg h-12">
                          Đặt hàng
                        </button>
                      </ButtonFixed>
                    )}
                  </div>
                );
              })}
            </List>
          </Box>
          {!readOnly && (
            <Text className=" p-4 text-center">
              Đặt hàng đồng nghĩa với việc bạn đồng ý quan tâm {stores[orderInfo.storeId].nameStore}
              để nhận tin tức mới
            </Text>
          )}
        </div>
      )}
    </Page>
  );
};

export default FinishOrder;
