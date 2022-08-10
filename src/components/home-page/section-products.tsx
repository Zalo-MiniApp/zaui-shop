import Box from 'zmp-framework/react/box';
import { SectionProductsProps } from '../../models';
import { calcSalePercentage, cx, getImgUrl } from '../../utils';
import CardProductVertical from '../card-item/card-product-vertical';

const SectionProducts = ({
  title,
  pathBanner,
  watchMore = true,
  direction = 'horizontal',
  colPercentage = 36,
  children,
  data = [],
  onChoose,
}: SectionProductsProps) => (
  <div className="pt-4">
    <Box m="0" className="bg-white" p="4">
      <div className="flex flex-row justify-between items-center pb-3.5">
        <span className="text-base text-primary font-semibold">{title}</span>
        {watchMore && (
          <span className="text-sm text-[#828588]" onClick={onChoose} role="button">
            Xem tất cả
          </span>
        )}
      </div>
      {pathBanner && (
        <div onClick={onChoose} role="button">
          <img
            src={getImgUrl(pathBanner!)}
            className="pb-[14px] w-full h-auto object-contain"
            alt=""
          />
        </div>
      )}
      <div
        className={cx(
          'gap-2',
          direction === 'vertical' ? 'grid grid-cols-2' : 'flex flex-row overflow-x-auto'
        )}
      >
        {data.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={direction === 'horizontal' ? 'flex-none' : ''}
            style={{
              width: `${direction === 'vertical' ? 100 : colPercentage}%`,
            }}
          >
            {children ? (
              children(item)
            ) : (
              <CardProductVertical
                pathImg={item.imgProduct}
                nameProduct={item.nameProduct}
                salePrice={item.salePrice}
                salePercentage={calcSalePercentage(item.salePrice, item.retailPrice)}
                productId={item.id}
                storeId={item.storeId}
              />
            )}
          </div>
        ))}
      </div>
    </Box>
  </div>
);

export default SectionProducts;
