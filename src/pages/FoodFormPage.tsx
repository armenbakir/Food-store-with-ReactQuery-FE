import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Food } from "@types";
import { useCategories } from "@hooks";
import { getFood, saveFood } from "@services";
import { _Input, InputField } from "@components/common";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  categoryId: z.string().min(1, { message: "You must select a category." }),
  numberInStock: z
    .number({ invalid_type_error: "Stock must be a number." })
    .min(1, { message: "Stock must be at least 1." })
    .max(100, { message: "Stock cannot be higher than 100." }),
  price: z
    .number({ invalid_type_error: "Price must be a number." })
    .min(1, { message: "Price must be at least 1." })
    .max(20, { message: "Price cannot be higher than 20." }),
});

type FormData = z.infer<typeof schema>;

function FoodFormPage() {
  const { id } = useParams();
  const categories = useCategories();
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function fetch() {
      if (!id || id === "new") return;

      const { data: food } = await getFood(id);

      if (!food) return navigate("/not-found");

      reset(mapToFormData(food));
    }

    fetch();
  }, []);

  function mapToFormData(food: Food): FormData {
    return {
      id: food.id,
      name: food.name,
      categoryId: food.category.id,
      numberInStock: food.numberInStock,
      price: food.price,
    };
  }

  async function onSubmit(data: FormData) {
    console.log("data", data);
    await saveFood(data);
    navigate("/foods");
  }

  return (
    <div className="p-5">
      <h1>Food form {id} </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <InputField.Label>
            <i className="fa-solid fa-user" />
            Name
          </InputField.Label>
          <InputField.Input {...register("name")} />
          <InputField.Error error={errors.name} />
        </InputField>
        <div className="mb-3 w-50">
          <select {...register("categoryId")} className="form-select">
            <option />
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-danger">{errors.categoryId.message}</p>
          )}
        </div>
        <InputField>
          <InputField.Label>Stock</InputField.Label>
          <InputField.Input
            {...register("numberInStock", { valueAsNumber: true })}
          />
          <InputField.Error error={errors.numberInStock} />
        </InputField>
        <InputField>
          <InputField.Label>Price</InputField.Label>
          <InputField.Input {...register("price", { valueAsNumber: true })} />
          <InputField.Error error={errors.price} />
        </InputField>
        <button className="btn btn-primary" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  );
}

export default FoodFormPage;

// ForwardRef without Compound component Instead of InputField in the div
//         <_Input
//           {...register("price", { valueAsNumber: true })}
//           label="Price"
//           error={errors.price}
//         />
