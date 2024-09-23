import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RecipesDTO } from 'src/app/recipes/RecipesDTO'
import { createRecipe } from '../app/create-recipe/createRecipe';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditDTO } from 'src/app/recipes-details/recipes-details.component';
import {ImageDTO} from "../app/recipes/ImageDTO";
import { RecensionsDTO } from 'src/app/recipes-details/recensions-dto';

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

  getImage(Id: number) {
    return this.http.get<ImageDTO>(this.baseUrl + "/getImage/" + Id);
  }

  getAllImages(): Observable<ImageDTO[]> {
    return this.http.get<ImageDTO[]>(this.baseUrl + "/getAllImages");
  }

  CreateRecipe(RecipesDTO: {
    difficulty: string;
    ingrediencie: string;
    imageId: Number;
    cas: any;
    veganske: any;
    vegetarianske: any;
    imageURL: string;
    name: string;
    nizkoKaloricke: any;
    postup: string
  }) {
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
  letsAddComment(recenzia: RecensionsDTO){
    return this.http.post<RecensionsDTO>(this.recipesURL + "PridajRecenziu",recenzia);
  }
  getRecension(id: number){
    return this.http.get<RecensionsDTO[]>(this.recipesURL + "recenzie/" + id);
  }
  likeRecension(recensionId: number){
    return this.http.post<void>(this.recipesURL + "likeRecension/" + recensionId, recensionId);
  }
}
