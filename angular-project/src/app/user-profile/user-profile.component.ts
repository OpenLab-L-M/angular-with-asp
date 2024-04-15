import { Component, signal } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { UserDTO } from './UserDTO';
import { RecipesService } from 'src/services/recipes.service';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user: UserDTO;
  ourListOfRecipes = signal<RecipesDTO[]>([]);
  private destroy$ = new Subject<void>();
  constructor(private userService: UserService, private recipesSevice: RecipesService){}
  ngOnInit(): void{
    this.userService.getCurrentUser()
    .subscribe(result => console.log(result));
    this.userService.usersRecipes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => this.ourListOfRecipes.set(result));
  }
  
}
