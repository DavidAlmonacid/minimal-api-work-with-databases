import { useEffect, useState } from "react";
import { PizzaList } from "./PizzaList";

export interface Pizza {
  id: number;
  name: string;
  description: string;
}

const term = "Pizza";

export function Pizza() {
  const [data, setData] = useState<Array<Pizza>>([]);
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    fetchPizzaData();
  }, []);

  function fetchPizzaData() {
    // Simulate fetching data from API
    const pizzaData: Array<Pizza> = [
      {
        id: 1,
        name: "Margherita",
        description: "Tomato sauce, mozzarella, and basil"
      },
      {
        id: 2,
        name: "Pepperoni",
        description: "Tomato sauce, mozzarella, and pepperoni"
      },
      {
        id: 3,
        name: "Hawaiian",
        description: "Tomato sauce, mozzarella, ham, and pineapple"
      }
    ];

    setData(pizzaData);
    setMaxId(Math.max(...pizzaData.map((pizza) => pizza.id)));
  }

  const handleCreate = (item: Pizza) => {
    // Simulate creating item on API
    const newItem = { ...item, id: data.length + 1 };
    setData([...data, newItem]);
    setMaxId(maxId + 1);
  };

  const handleUpdate = (item: Pizza) => {
    // Simulate updating item on API
    const updatedData = data.map((pizza) => {
      return pizza.id === item.id ? item : pizza;
    });
    setData(updatedData);
  };

  const handleDelete = (id: number) => {
    // Simulate deleting item on API
    const updatedData = data.filter((pizza) => pizza.id !== id);
    setData(updatedData);
  };

  return (
    <div>
      <PizzaList
        name={term}
        data={data}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
