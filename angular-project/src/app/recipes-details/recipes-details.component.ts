import { Component, inject, signal } from '@angular/core';
import { RecipesService } from 'src/recipes.service';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recipes-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent {
  recipeService = inject(RecipesService);
  private destroy$ = new Subject<void>();
  recipe= signal<RecipesDTO>(undefined);

  
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getClickedRecipes(id)
       .subscribe(result => this.recipeService.chRecipe = result);



   }

    deleteBtn() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.recipeService.deleteGuild(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => console.log(result));
   
  }
  }
