import { Page } from 'zmp-framework/react';
import { zmp } from 'zmp-framework/react/lite';
import Categories from '../components/home-page/categories';
import SearchCustom from '../components/home-page/search-custom';
import SectionProducts from '../components/home-page/section-products';
import ImageRatio from '../components/img-ratio';
import { Store, SectionProductsProps } from '../models';
import store from '../store';
import { ImgUrl } from '../utils';

const CartBannerStore = ({ pathImg, onClick }) => (
  <div onClick={onClick} role="button">
    <ImageRatio src={ImgUrl(pathImg)} alt="store-img" ratio={120 / 150} />
  </div>
);

const CartLogoStore = ({ pathImg, nameStore, onClick }) => (
  <div className="flex flex-col items-center" onClick={onClick} role="button">
    <img
      src={ImgUrl(pathImg)}
      alt="store-img"
      className=" rounded-full object-cover w-[60px] h-[60px]"
    />
    <div className=" text-sm text-center mt-4 whitespace-pre-line">{nameStore}</div>
  </div>
);

const sectionProducts: SectionProductsProps[] = [
  {
    id:1,
    title: 'CHÍNH HÃNG GIÁ TỐT',
    watchMore: false,
    pathBanner: 'banner-sale-75',
    data: store.state.store,
    colPercentage: 27,
    children: (item: Store) => (
      <CartLogoStore
        pathImg={item.pathImg}
        nameStore={item.nameStore}
        onClick={() =>
          zmp.views.main.router.navigate(`/mini-store/?id=${item.key}`, { animate: false })
        }
      />
    ),
  },
  {
    id:2,
    title: 'CHÍNH HÃNG GIÁ TỐT',
    watchMore: false,
    data: store.state.store,
    children: (item: Store) => (
      <CartBannerStore
        pathImg={item.bannerStore}
        onClick={() =>
          zmp.views.main.router.navigate(`/mini-store/?id=${item.key}`, { animate: false })
        }
      />
    ),
  },
  {
    id:3,
    title: 'KHUYẾN MÃI HOT',
    pathBanner: 'banner',
    data: store.state.products,
  },
  {
    id:4,
    title: 'BÁN CHẠY NHẤT',
    pathBanner: 'flash-sale',
    data: store.state.products,
    direction: 'vertical',
  },
];



const HomePage = ({ zmprouter }) => {
  const onHandleSubmitForm = (data) => {
    const { search } = data;
    if (search) {
      store.dispatch('setKeyword', search);
      zmprouter.navigate('search-product', { animate: false });
    }
  };

  return (
    <Page ptr name="home" className="bg-primary">
      <div className=" sticky top-0 bg-primary z-50 py-3 px-8">
        <SearchCustom onHandleSubmitForm={onHandleSubmitForm} />
      </div>

      <div className=" bg-primary">
        <img src={ImgUrl('banner')} className="w-full object-cover" alt=""/>
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
          onChoose={() => zmprouter.navigate('detail-section', { animate: false })}
        >
          {section.children}
        </SectionProducts>
      ))}
    </Page>
  );
};

export default HomePage;
