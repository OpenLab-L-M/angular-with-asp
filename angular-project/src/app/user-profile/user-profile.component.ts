import { Component, signal } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { UserDTO } from './UserDTO';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { RecipesService } from 'src/services/recipes.service';
import { MatIconModule } from '@angular/material/icon';
import { MatIconAnchor } from '@angular/material/button';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgFor,
    NgIf, MatIconModule, MatIconAnchor],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  ourListOfRecipes = signal<RecipesDTO[]>([]);

  user = signal<UserDTO>(undefined);
  private destroy$ = new Subject<void>();
  constructor(private userService: UserService, private recipesSevice: RecipesService){}
  ngOnInit(): void{
    this.userService.getCurrentUser()
    .subscribe(result => this.user.set(result));
    this.userService.usersRecipes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => this.ourListOfRecipes.set(result));
  }
  
}
