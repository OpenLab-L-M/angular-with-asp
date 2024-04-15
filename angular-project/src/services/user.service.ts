import { Inject, Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/user-profile/UserDTO';
import { RecipesDTO } from 'src/app/recipes/RecipesDTO';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);
  constructor(@Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) { }
  private userUrl = this.baseUrl + '/userProfile';
  getCurrentUser(){
    return this.httpClient.get<UserDTO>(this.userUrl);
  }

  usersRecipes(){
    return this.httpClient.get<RecipesDTO[]>(this.userUrl + '/usersRecipes');
  }

}
