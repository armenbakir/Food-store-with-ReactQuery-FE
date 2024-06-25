import { getCategories } from "@services";
import { Category } from "@types";
import { useEffect, useState } from "react";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);
    }

    fetch();
  }, []);

  return categories;
}

export default useCategories;
