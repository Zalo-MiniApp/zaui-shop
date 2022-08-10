import { zmp } from 'zmp-framework/react';
import { listCategoriesDummy } from '../../dummy';
import { getImgUrl } from '../../utils';

const Categories = () => (
  <div className="grid grid-cols-4 gap-x-2  gap-y-4 px-6 pt-1 pb-6">
    {listCategoriesDummy.map((cate) => (
      <div
        key={cate.id}
        className="flex flex-col items-center"
        onClick={() =>
          zmp.views.main.router.navigate(`/search-product/?title=${cate.nameCate}`, {
            transition: 'zmp-fade',
          })
        }
        role="button"
      >
        <div>
          <img src={getImgUrl(cate.iconCate)} width="42px" height="42px" alt="" />
        </div>
        <div className="text-xs text-center text-white whitespace-pre-line">{cate.nameCate}</div>
      </div>
    ))}
  </div>
);

export default Categories;
