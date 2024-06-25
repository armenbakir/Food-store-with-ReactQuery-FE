import { getFoods } from "@services";
import { Food } from "@types";
import { useEffect, useState } from "react";

function useFoods() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data: foods } = await getFoods();
      setFoods(foods);
    }

    fetch();
  }, []);

  return { foods, setFoods };
}

export default useFoods;
