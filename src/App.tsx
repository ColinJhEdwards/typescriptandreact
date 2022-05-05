import React, { FormEvent, useEffect, useState } from "react";
import { IRecipe } from "./IRecipe";
import RecipeComponent from "./RecipeComponent";

function App() {
  // api key stored in .env file
  const apiKey = process.env.REACT_APP_API_KEY;
  //  the recipesFound state has a interface of the IRecipe, to indicate what our expected data will look like.
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  // indicating that the search parameter will be a string, and that the function searchForRecipes
  // is a Promise that returns the data for the IRecipe interface
  const searchForRecipes = async (search: string): Promise<IRecipe[]> => {
    const result = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apikey=${apiKey}&query=${search}`
    );
    return (await result.json()).results;
  };

  // indicating that our event(e) occurs on a Form element
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
      {recipeSearch && <p>results for {recipeSearch}...</p>}
      <div className="recipeContainer">
        {recipesFound.map((recipe) => (
          <RecipeComponent key={recipe.href} recipe={recipe}></RecipeComponent>
        ))}
      </div>
    </div>
  );
}

export default App;
