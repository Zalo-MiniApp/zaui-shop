import React from "react";
import { Box, Icon, Input } from "zmp-framework/react";

const SearchCustom = () => {
  return (
    <Box mt="0" pt="3" ml="8" mr="8">
      <div className="flex items-center justify-between flex-row">
        <div className="w-full">
          <Input
            wrap={false}
            type="text"
            placeholder="Tìm kiếm"
            clearButton
            name="search"
            inputStyle={{
              borderRadius: "0.75rem",
              backgroundColor: "white",
              width: "100%",
              height: "2rem",
            }}
          />
        </div>
        <div className="ml-1.5 w-8 h-8 bg-white rounded-xl flex items-center justify-center">
          <Icon zmp="zi-search" size={18} className="color-theme" />
        </div>
      </div>
    </Box>
  );
};

export default SearchCustom;
