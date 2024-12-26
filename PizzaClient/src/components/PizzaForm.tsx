import {
  Button,
  Field,
  Input,
  makeStyles,
  Title3
} from "@fluentui/react-components";
import type { Pizza } from "./Pizza";

interface PizzaFormProps {
  name: string;
  formData: Pizza;
  setFormData: React.Dispatch<React.SetStateAction<Pizza>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  onCreate: (item: Pizza) => void;
  onUpdate: (item: Pizza) => void;
}

const useStyles = makeStyles({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: "28px",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "16px 0"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px"
  },
  formButtonSection: {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: "16px",
    marginTop: "16px"
  }
});

export function PizzaForm({
  name,
  formData,
  setFormData,
  editingId,
  setEditingId,
  onCreate,
  onUpdate
}: PizzaFormProps) {
  const pizzaFormStyles = useStyles();

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

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ id: 0, name: "", ingredients: "" });
  };

  return (
    <div className={pizzaFormStyles.formWrapper}>
      <Title3>New {name}</Title3>

      <form className={pizzaFormStyles.form} onSubmit={handleSubmit}>
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

        <section className={pizzaFormStyles.formButtonSection}>
          {editingId && (
            <Button
              appearance="secondary"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}

          <Button appearance="primary" type="submit">
            {editingId ? "Update" : "Create"}
          </Button>
        </section>
      </form>
    </div>
  );
}
