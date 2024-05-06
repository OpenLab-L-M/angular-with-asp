export class RecipesDTO{
    id: number;
    name: string;
    description: string;
    difficulty: string;
    imageURL: string;
    checkID: string;
    userID: string;
    recipesID?: number;
  }