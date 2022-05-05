import React from "react";
import { IRecipe } from "./IRecipe";

function RecipeComponent(props: { recipe: IRecipe }) {
  const { recipe } = props;
  return (
    <div className="recipe">
      <div className="title">
        <img src={recipe.thumbnail || "./placeholder.jpg"} alt={recipe.title} />
        <p>{recipe.title}</p>
      </div>
      {recipe.ingredients && (
        <ul>
          {recipe.ingredients.split(",").map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      )}
      <a href={recipe.href} target="_blank"></a>
    </div>
  );
}

export default RecipeComponent;
