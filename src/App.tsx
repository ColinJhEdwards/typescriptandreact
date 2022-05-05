import React, { FormEvent, useEffect, useState } from "react";
import { IRecipe } from "./IRecipe";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  const searchForRecipes = async (search: string): Promise<IRecipe[]> => {
    const result = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apikey=${apiKey}&query=${search}`
    );
    return (await result.json()).results;
  };

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("#searchText") as HTMLInputElement;
    setRecipeSearch(input.value);
  };

  useEffect(() => {
    (async () => {
      const search = encodeURIComponent(recipeSearch);
      if (search) {
        const response = await searchForRecipes(search);
        setRecipesFound(response);
      }
    })();
  }, [recipeSearch]);

  return (
    <div className="App">
      <h2>Hello world</h2>
      <form className="searchForm" onSubmit={(e) => search(e)}>
        <input type="text" id="searchText" />
        <button>Search</button>
      </form>
    </div>
  );
}

export default App;
