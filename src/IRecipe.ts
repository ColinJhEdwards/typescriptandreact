// This interface is to indicate the expected format of the data we will retrieve from our api
export interface IRecipe {
  href: string;
  ingredients: string;
  thumbnail: string;
  title: string;
}
