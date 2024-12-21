import { Button, Field, Input, Title3 } from "@fluentui/react-components";
import { useState } from "react";
import type { Pizza } from "./Pizza";
import { PizzaItem } from "./PizzaItem";

interface PizzaListProps {
  name: string;
  data: Array<Pizza>;
  onCreate: (item: Pizza) => void;
  onUpdate: (item: Pizza) => void;
  onDelete: (id: number) => void;
  error: { message: string } | null;
}

export function PizzaList({
  name,
  data,
  onCreate,
  onUpdate,
  onDelete,
  error
}: PizzaListProps) {
  const [formData, setFormData] = useState<Pizza>({
    id: 0,
    name: "",
    ingredients: ""
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingId) {
      onUpdate(formData);
      setEditingId(null);
    } else {
      onCreate(formData);
    }

    setFormData({ id: 0, name: "", ingredients: "" });
  };

  const handleEdit = (item: Pizza) => {
    const { id, name, ingredients } = item;

    setEditingId(item.id);
    setFormData({ id, name, ingredients });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ id: 0, name: "", ingredients: "" });
  };

  return (
    <div>
      <Title3>New {name}</Title3>

      <form onSubmit={handleSubmit}>
        <Field label="Name" required>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
        </Field>

        <Field label="Ingredients" required>
          <Input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleFormChange}
            required
          />
        </Field>

        <Button appearance="primary" type="submit">
          {editingId ? "Update" : "Create"}
        </Button>

        {editingId && (
          <Button
            appearance="secondary"
            type="button"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        )}
      </form>

      {error && <div>{error.message}</div>}

      <Title3>{name}s</Title3>

      <ul>
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
