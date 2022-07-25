import React, { useRef } from "react";
import { categoriesProductsDummy } from "../../dummy/category-products";
import cx from "../../utils/cx";
import Box from "zmp-framework/react/box";
import Icon from "zmp-framework/react/icon";

type CategoryStoreProps = {
  categories: string[];
  activeCate: number;
  setActiveCate: (index) => void;
  activeFilter: string;
  setActiveFilter: (index) => void;
  filter: { key: string; name: string }[];
};

const CategoriesStore = ({
  categories,
  activeCate,
  setActiveCate,
  activeFilter,
  setActiveFilter,
  filter,
}: CategoryStoreProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <div className="bg-white pb-2">
      <div className="overflow-x-auto flex flex-row text-base mx-4">
        {categories?.map((category, index) => (
          <div
            key={index}
            className={cx(
              "mr-4 flex-none pb-2",
              activeCate === index
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-gray-500"
            )}
            onClick={() => setActiveCate(index)}
          >
            {category}
          </div>
        ))}
      </div>
      <Box className=" flex justify-between items-center" m={4}>
        <div className=" text-base font-normal text-gray-500">
          {categoriesProductsDummy[activeCate].length} Sản phẩm
        </div>
        <div className="relative">
          <select
            className=" min-h-0 rounded-md bg-white h-8 w-28 flex items-center justify-between px-2"
            ref={selectRef}
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            {filter.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.name}
              </option>
            ))}
          </select>
          <div className="center-absolute right-0">
            <Icon
              zmp="zi-chevron-down"
              className="pointer-events-none"
              size={24}
            ></Icon>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CategoriesStore;
