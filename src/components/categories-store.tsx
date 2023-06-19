import React from "react";
import { Box, Select } from "zmp-ui";
import { cx } from "../utils";

const { Option } = Select;

type CategoryStoreProps = {
  categories: string[];
  activeCate: number;
  setActiveCate: (index) => void;
  activeFilter: string;
  setActiveFilter: (index) => void;
  filter: { key: string; name: string }[];
  quantity: number;
};

const CategoriesStore = ({
  categories,
  activeCate,
  setActiveCate,
  activeFilter,
  setActiveFilter,
  filter,
  quantity,
}: CategoryStoreProps) => {
  return (
    <div className="bg-white pb-2">
      <div className="overflow-x-auto flex flex-row text-base mx-4">
        {categories?.map((category, index) => (
          <div
            key={category}
            className={cx(
              "mr-4 flex-none pb-2",
              activeCate === index
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-gray-500"
            )}
            onClick={() => {
              setActiveCate(index);
            }}
            role="button"
          >
            {category}
          </div>
        ))}
      </div>
      <Box
        flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        m={4}
      >
        <div className=" text-base font-normal text-gray-500">
          {quantity} Sản phẩm
        </div>
        <div className="relative w-32">
          <Select
            label=""
            placeholder=""
            defaultValue={filter[0].key}
            value={activeFilter}
            onChange={(value) => setActiveFilter(value)}
            className="filter-selection"
          >
            {filter.map((opt) => (
              <Option key={opt.key} value={opt.key} title={opt.name} />
            ))}
          </Select>
        </div>
      </Box>
    </div>
  );
};

export default CategoriesStore;
