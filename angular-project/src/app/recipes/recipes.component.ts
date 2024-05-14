import { Component, inject, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RecipesDTO } from './RecipesDTO';
import { RecipesService } from 'src/services/recipes.service';
import { UserService } from 'src/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FilterPipe } from 'src/pipes/filter-pipe.pipe';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltip } from '@angular/material/tooltip';
import { ElementRef, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { createRecipe } from '../create-recipe/createRecipe';
import { UserDTO } from '../user-profile/UserDTO';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    MatIcon,
    NgIf,
    FilterPipe,
    MatButtonModule,
    MatTooltip,
    MatCardModule,
    MatSidenavModule,
    FormsModule
  ],
  
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  ktoryRecept(id: number){
    debugger
    const checkbox = document.getElementById('favourite') as HTMLInputElement;
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked){
      this.recipeService.addToFav(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    }
    }
  recipeService = inject(RecipesService);
  recipes? = signal<RecipesDTO[]>([]);
  private destroy$ = new Subject<void>();
  guild = signal<RecipesDTO>(undefined);
  user = signal<UserDTO>(undefined);

  easyChecked: boolean = false;
  mediumChecked: boolean = false;
  hardChecked: boolean = false;

  sSearchRecept: string = '';
  constructor(private userService: UserService,) { }
  ngOnInit(): void {
    this.recipeService.getRecipesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.recipes.set(result));
      this.userService.getCurrentUser()
      .subscribe(result => this.user.set(result));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  join: String = "";

  filterRecipesByDifficulty(difficulty: string): void {
    if (this.join.includes(difficulty)) {
      this.join = this.join.replace(difficulty + " ", "");
    } else {
      this.join += difficulty + " ";
    }
  }
  
  call() {
    console.log(this.join);
    const difficultiesArray = this.join.trim().split(" ");
    this.sSearchRecept = difficultiesArray.join(" ").toLowerCase();
  }
  
  clearFilter(): void {
    this.sSearchRecept = '';
    this.join = '';

    this.easyChecked = false;
    this.mediumChecked = false;
    this.hardChecked = false;
  }

  public getImageSrc(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }
}
