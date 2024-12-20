import { useState } from "react";
import type { Pizza } from "./Pizza";

interface PizzaListProps {
  name: string;
  data: Array<Pizza>;
  onCreate: (item: Pizza) => void;
  onUpdate: (item: Pizza) => void;
  onDelete: (id: number) => void;
  error?: { message: string };
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
    description: ""
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

    setFormData({ id: 0, name: "", description: "" });
  };

  const handleEdit = (item: Pizza) => {
    const { id, name, description } = item;

    setEditingId(item.id);
    setFormData({ id, name, description });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ id: 0, name: "", description: "" });
  };

  return (
    <div>
      <h2>New {name}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleFormChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleFormChange}
        />

        <button type="submit">{editingId ? "Update" : "Create"}</button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {error && <div>{error.message}</div>}

      <h2>{name}s</h2>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <div>
              {item.name} - {item.description}
            </div>

            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
