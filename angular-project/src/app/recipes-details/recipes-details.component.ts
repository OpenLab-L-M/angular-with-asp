import { Component, inject, signal } from '@angular/core';
import { RecipesService } from 'src/services/recipes.service';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconAnchor } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-recipes-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatIconAnchor, MatButtonModule, MatRadioModule, MatCardModule, ReactiveFormsModule], 
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent {
  clicked = false;
  recipeService = inject(RecipesService);
  private destroy$ = new Subject<void>();
  recipe: RecipesDTO;

  profileForm = new FormGroup({
    name: new FormControl(''),
    ingrediencie: new FormControl(''),
    postup: new FormControl(''),
    imgURL: new FormControl(''),
    cas: new FormControl(null),
  });
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getClickedRecipes(id)
       .subscribe(result => {
        this.recipeService.chRecipe = result;
        this.profileForm.patchValue({
          name: this.recipeService.chRecipe.name,
          ingrediencie: this.recipeService.chRecipe.ingrediencie,
        postup: this.recipeService.chRecipe.postup,
        imgURL: this.recipeService.chRecipe.imageURL,
        cas: this.recipeService.chRecipe.cas,
        })
      },
       );


   }

    deleteBtn() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.recipeService.deleteGuild(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/Recipes']));
   
  }
  edit(){
  this.clicked = true;
  
}
submit(){
  const id = parseInt(this.route.snapshot.paramMap.get('id'));
  this.recipeService.edit({
    id: parseInt(this.route.snapshot.paramMap.get('id')),
    name: this.profileForm.controls['name']?.value,
    ingrediencie: this.profileForm.controls['ingrediencie']?.value,
      postup: this.profileForm.controls['postup']?.value,
      imgURL: this.profileForm.controls['imgURL']?.value,
      cas: this.profileForm.controls['cas']?.value,
      
  })
  .pipe(takeUntil(this.destroy$))
  .subscribe();
  this.clicked=false;
  
}
}

export class EditDTO{
  id?:number;
  name?: string;
  ingrediencie?: string;
  postup?: string;
  imgURL?: string;
  cas?: number;
}