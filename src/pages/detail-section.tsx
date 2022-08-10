import { useEffect } from 'react';
import Page from 'zmp-framework/react/page';
import { useStore } from 'zmp-framework/react';
import store from '../store';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';
import getImgUrl from '../utils/img-url';
import CardProductVertical from '../components/card-item/card-product-vertical';
import Card from '../components/card';
import { Product } from '../models';
import { calcSalePercentage } from '../utils';
import { changeStatusBarColor } from '../services/navigation-bar';
import setHeader from '../services/header';

const DetailSection = ({ zmproute }) => {
  useEffect(() => {
    store.dispatch('setProductResult');
  }, []);

  const productResult = useStore('productResult');

  return (
    <Page
      onPageBeforeIn={() => {
        hideNavigationBar();
        setHeader({ title: zmproute.query.title, type: 'secondary' });
        changeStatusBarColor('secondary');
      }}
      onPageBeforeOut={showNavigationBar}
      name="search-product"
      className="bg-white"
    >
      <img src={getImgUrl(zmproute.query.pathBanner)} className="w-full object-cover" alt="" />
      <Card title={`${productResult.length} Sản phẩm`}>
        <div className="gap-2 grid grid-cols-2">
          {productResult.map((item: Product) => (
            <div key={item.id}>
              <div className="w-full h-full">
                <CardProductVertical
                  pathImg={item.imgProduct}
                  nameProduct={item.nameProduct}
                  salePrice={item.salePrice}
                  salePercentage={calcSalePercentage(item.salePrice, item.retailPrice)}
                  productId={item.id}
                  storeId={item.storeId}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
};
export default DetailSection;
