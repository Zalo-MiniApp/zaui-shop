import { FunctionComponent } from "react";
import { Avatar, Button, Text, Title, zmp } from "zmp-framework/react";
import { Food } from "../../../models";
import Price from "../../../components/format/price";

interface FoodItemProps {
  food: Food
}

const FoodItem: FunctionComponent<FoodItemProps> = ({ food }) => {
  const pick = () => {
    zmp.views.main.router.navigate({
      path: '/food-picker/',
      query: {
        id: food.id
      }
    })
  }
  return <div onClick={pick} className="p-6 bg-white text-center" style={{ borderRadius: 50 }}>
    <Avatar size={96} src={food.image} />
    <Title size="small">{food.name}</Title>
    <Text size="xlarge" className="text-secondary" bold><Price amount={food.price} /></Text>
    <Button iconZMP="zi-plus" fill className="w-10 m-auto"></Button>
  </div>;
}

export default FoodItem;