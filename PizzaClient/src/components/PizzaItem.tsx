import {
  Body1,
  Body1Strong,
  Button,
  Card,
  CardFooter,
  CardHeader
} from "@fluentui/react-components";
import type { Pizza } from "./Pizza";

interface PizzaItemProps {
  pizza: Pizza;
  handleEdit: (item: Pizza) => void;
  onDelete: (id: number) => void;
}

export function PizzaItem({ pizza, handleEdit, onDelete }: PizzaItemProps) {
  return (
    <li>
      <Card>
        <CardHeader
          header={<Body1Strong>{pizza.name}</Body1Strong>}
          description={
            <Body1>
              <span>Ingredients: </span>
              <span>{pizza.ingredients}</span>
            </Body1>
          }
        />

        <CardFooter>
          <Button appearance="secondary" onClick={() => handleEdit(pizza)}>
            Edit
          </Button>

          <Button appearance="secondary" onClick={() => onDelete(pizza.id)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </li>
  );
}
