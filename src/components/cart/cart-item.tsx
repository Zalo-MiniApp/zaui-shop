import { FunctionComponent } from "react";
import { Box, Button, Text, Title } from "zmp-framework/react";
import { CartItem as CartItemModel } from "../../models";
import Price from "../format/price";

interface CartItemProps {
  item: CartItemModel
  onEdit?: () => void
}

const CartItem: FunctionComponent<CartItemProps> = ({ item, onEdit }) => {
  return <Box flex justifyContent="space-between">
    <Box flex>
      <Button className="w-10" fill>{item.quantity}x</Button>
      <div className="ml-6">
        <Title size="small">{item.food.name}</Title>
        {item.food.extras.map(extra => <Text key={extra.key}>{extra.label} {extra.options.find(o => o.selected)?.label}</Text>)}
        {item.food.options.filter(o => o.selected).map(option => <Text key={option.key}>{option.label}</Text>)}
        {item.note && <>Ghi chú: {item.note}</>}
      </div>
    </Box>
    <Box flex flexDirection="column" alignItems="flex-end" justifyContent="space-between">
      <Text className="mr-2 ml-2 text-secondary mb-0" bold><Price amount={item.food.price * item.quantity} /></Text>
      {onEdit && <Button onClick={onEdit}>Thay đổi</Button>}
    </Box>
  </Box>;
}

export default CartItem;