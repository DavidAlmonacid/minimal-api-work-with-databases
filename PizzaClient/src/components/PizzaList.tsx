import { makeStyles, Title3 } from "@fluentui/react-components";
import type { Pizza } from "./Pizza";
import { PizzaItem } from "./PizzaItem";

interface PizzaListProps {
  name: string;
  data: Array<Pizza>;
  error: string | null;
  setFormData: React.Dispatch<React.SetStateAction<Pizza>>;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  onDelete: (id: number) => void;
}

const useStyles = makeStyles({
  listWrapper: {
    padding: "16px"
  },
  title: {
    display: "block",
    margin: "12px 0"
  },
  list: {
    display: "grid",
    gap: "20px",
    listStyleType: "none",
    padding: 0,

    ["@media screen and (min-width: 640px)"]: {
      gridTemplateColumns: "1fr 1fr",
      padding: "16px"
    }
  }
});

export function PizzaList({
  name,
  data,
  error,
  setFormData,
  setEditingId,
  onDelete
}: PizzaListProps) {
  const pizzaListStyles = useStyles();

  const handleEdit = (item: Pizza) => {
    const { id, name, ingredients } = item;

    setEditingId(item.id);
    setFormData({ id, name, ingredients });
  };

  return (
    <div className={pizzaListStyles.listWrapper}>
      {error && <div>{error}</div>}

      <Title3 className={pizzaListStyles.title}>{name}s</Title3>

      <ul className={pizzaListStyles.list}>
        {data.map((item) => (
          <PizzaItem
            key={item.id}
            pizza={item}
            handleEdit={handleEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
