import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RecipesDTO } from 'src/app/recipes/RecipesDTO'
import { createRecipe } from '../app/create-recipe/createRecipe';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditDTO } from 'src/app/recipes-details/recipes-details.component';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesURL = this.baseUrl + '/recipes/';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) { }
   public chRecipe= new  RecipesDTO;
  getRecipesList() {
    return this.http.get<RecipesDTO[]>(this.recipesURL)
  }

  getClickedRecipes(Id: number) {
    return this.http.get<RecipesDTO>(this.recipesURL + Id);
  }
  CreateRecipe(RecipesDTO: createRecipe) {
    return this.http.post<createRecipe>(this.baseUrl + '/CreateRecipe', RecipesDTO)
  }
  deleteGuild(Id: number) {

    return this.http.delete<string>(this.recipesURL + Id);
  }
  addToFav(id: number){
    return this.http.post<void>(this.recipesURL + "AddToFav/" + id, id);
  }
  edit(upraveny: EditDTO){
    return this.http.put<string>(this.recipesURL + "Editujem", upraveny);
  }
}
