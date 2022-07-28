import React from "react";
import { listCategories } from "../../constants/list-categories";
import { imgUrl } from "../../utils/imgUrl";

const Categories = () => {
  return (
    <div className="grid grid-cols-4 gap-x-2  gap-y-4 p-6">
      {listCategories.map((cate) => (
        <div  key={cate.id} className="flex flex-col items-center">
          <div>
            <img src={imgUrl(cate.iconCate)} width="42px" height="42px" />
          </div>
          <div className="text-xs text-center text-white">
            {cate.nameCate}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
