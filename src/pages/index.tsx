/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { Page, useStore } from 'zmp-framework/react';
import { zmp } from 'zmp-framework/react/lite';
import Categories from '../components/home-page/categories';
import SearchCustom from '../components/home-page/search-custom';
import SectionProducts from '../components/home-page/section-products';
import ImageRatio from '../components/img-ratio';
import { Store, SectionProductsProps } from '../models';
import setHeader from '../services/header';
import { changeStatusBarColor } from '../services/navigation-bar';
import store from '../store';
import { getImgUrl } from '../utils';

const CartBannerStore = ({ pathImg, onClick }) => (
  <div onClick={onClick} role="button">
    <ImageRatio src={getImgUrl(pathImg)} alt="store-img" ratio={120 / 150} />
  </div>
);

const CartLogoStore = ({ pathImg, nameStore, onClick }) => (
  <div className="flex flex-col items-center" onClick={onClick} role="button">
    <img
      src={getImgUrl(pathImg)}
      alt="store-img"
      className=" rounded-full object-cover w-[60px] h-[60px]"
    />
    <div className=" text-sm text-center mt-4 whitespace-pre-line">{nameStore}</div>
  </div>
);

const HomePage = ({ zmprouter }) => {
  const handleSubmitForm = (data) => {
    const { search } = data;
    if (search) {
      store.dispatch('setKeyword', search);
      zmprouter.navigate(`/search-product/?title=${search}`, { transition: 'zmp-fade' });
    }
  };
  const stores = useStore('store').slice(0, 7);
  const sectionProducts = useMemo<SectionProductsProps[]>(
    () => [
      {
        id: 1,
        title: 'CHÍNH HÃNG GIÁ TỐT',
        watchMore: false,
        pathBanner: 'banner-5',
        data: stores,
        colPercentage: 27,
        children: (item: Store) => (
          <CartLogoStore
            pathImg={item.logoStore}
            nameStore={item.nameStore}
            onClick={() =>
              zmp.views.main.router.navigate(`/mini-store/?id=${item.id}`, {
                transition: 'zmp-fade',
              })
            }
          />
        ),
      },
      {
        id: 2,
        title: 'CHÍNH HÃNG GIÁ TỐT',
        watchMore: false,
        data: stores,
        children: (item: Store) => (
          <CartBannerStore
            pathImg={item.bannerStore}
            onClick={() =>
              zmp.views.main.router.navigate(`/mini-store/?id=${item.id}`, {
                transition: 'zmp-fade',
              })
            }
          />
        ),
      },
      {
        id: 3,
        title: 'KHUYẾN MÃI HOT',
        pathBanner: 'banner-2',
        data: store.state.product.slice(0, 6),
      },
      {
        id: 4,
        title: 'BÁN CHẠY NHẤT',
        pathBanner: 'banner-3',
        data: store.state.product.slice(0, 6),
        direction: 'vertical',
      },
    ],
    [stores]
  );

  return (
    <Page
      ptr
      name="home"
      onPageBeforeIn={() => {
        setHeader({ hasLeftIcon: false });
        changeStatusBarColor();
      }}
    >
      <div className=" sticky top-0 bg-primary z-50 py-3 px-8">
        <SearchCustom onHandleSubmitForm={handleSubmitForm} />
      </div>

      <div className=" bg-primary">
        <img src={getImgUrl('banner-1-cut')} className="w-full object-cover" alt="" />
        <Categories />
      </div>

      {sectionProducts.map((section) => (
        <SectionProducts
          key={section.id}
          title={section.title}
          watchMore={section.watchMore}
          pathBanner={section.pathBanner}
          data={section.data}
          colPercentage={section.colPercentage}
          direction={section.direction}
          onChoose={() =>
            zmprouter.navigate(
              {
                path: '/detail-section',
                query: {
                  title: section.title,
                  pathBanner: section.pathBanner,
                },
              },
              { transition: 'zmp-fade' }
            )
          }
        >
          {section.children}
        </SectionProducts>
      ))}
    </Page>
  );
};

export default HomePage;
