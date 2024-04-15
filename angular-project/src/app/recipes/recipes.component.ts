import { Component, inject, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RecipesDTO } from './RecipesDTO';
import { RecipesService } from 'src/services/recipes.service';
import { FilterPipe } from 'src/pipes/filter-pipe.pipe';
import { NgModule } from '@angular/core';
import { createRecipe } from '../create-recipe/createRecipe';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    FilterPipe
  ],
  
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  recipeService = inject(RecipesService);
  recipes? = signal<RecipesDTO[]>([]);
  private destroy$ = new Subject<void>();
  guild = signal<RecipesDTO>(undefined);

  sSearchRecept: string = '';
  constructor() { }
  ngOnInit(): void {
    this.recipeService.getRecipesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.recipes.set(result));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  filterRecipesByDifficulty(difficulty: string): void {
    this.sSearchRecept = difficulty.toLowerCase();
  }

  clearFilter(): void {
    this.sSearchRecept = '';
  }
}
