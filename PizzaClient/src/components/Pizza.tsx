import { useEffect, useState } from "react";
import { PizzaList } from "./PizzaList";

export interface Pizza {
  id: number;
  name: string;
  ingredients: string;
}

const term = "Pizza";
const API_URL = "/pizzas";
const headers = {
  "Content-Type": "application/json"
};

export function Pizza() {
  const [data, setData] = useState<Array<Pizza>>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPizzaData();
  }, []);

  function fetchPizzaData() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }

  const handleCreate = (item: Pizza) => {
    console.log(`add item: ${JSON.stringify(item)}`);

    const { name, ingredients } = item;

    fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, ingredients })
    })
      .then((response) => response.json())
      .then((returnedItem) => setData([...data, returnedItem]))
      .catch((error) => setError(error));
  };

  const handleUpdate = (updatedItem: Pizza) => {
    console.log(`update item: ${JSON.stringify(updatedItem)}`);

    fetch(`${API_URL}/${updatedItem.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedItem)
    })
      .then(() => {
        setData(
          data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
      })
      .catch((error) => setError(error));
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE", headers })
      .then(() => setData(data.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div>
      <PizzaList
        name={term}
        data={data}
        error={error}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
