import { useMemo, useState } from "react";
import { Box, Button, useStore } from "zmp-framework/react";
import { Menu } from "../../../models";
import FoodItem from "./food";

function MenuTable() {
  const menu = useStore('menu') as Menu;
  const [selectedCategory, setSelectedCategory] = useState(0);
  const foods = useMemo(() => {
    return menu.categories[selectedCategory].foods;
  }, [menu, selectedCategory])

  return <>
    <Box className="overflow-x-auto no-scrollbar snap-mandatory snap-x scroll-p-4">
      <Box flex className="w-max">
        {menu.categories.map((category, index) => <Button
          key={category.id}
          className={`border-b-2 rounded-none px-4 snap-start ${selectedCategory === index ? 'border-primary' : ''}`}
          typeName={selectedCategory === index ? undefined : 'ghost'}
          onClick={() => setSelectedCategory(index)}
        >
          {category.name}
        </Button>)}
      </Box>
    </Box>
    <Box flex flexWrap justifyContent="center">
      {foods.map(food => <Box key={food.id} style={{ flexBasis: 'calc((100vw - 56px)/2)' }}>
        <FoodItem food={food} />
      </Box>)}
    </Box>
  </>;
}

export default MenuTable;