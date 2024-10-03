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
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { RecensionsDTO } from './recensions-dto';
@Component({
  selector: 'app-recipes-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatIconAnchor, MatButtonModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatFormField, MatFormFieldModule, MatLabel, MatInput, MatInputModule],
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent {
  
 public recensions = signal<RecensionsDTO[]>([])
  clicked = false;
  recipeService = inject(RecipesService);
  private destroy$ = new Subject<void>();
  //recipe: RecipesDTO;
  image: any[] = [];
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
        }
        )
      },
       );
       this.recipeService.getRecension(id).pipe(takeUntil(this.destroy$))
    .subscribe(value => this.recensions.set(value));

    this.recipeService.getImage(id).subscribe(value =>
      this.image = value.image
    )
    console.log(parseInt(this.route.snapshot.paramMap.get('id')));
    
   }


   showImage() {
     return `data:image/jpeg;base64,${this.image}`
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
 addComment(){
  
  var inputValue = (<HTMLInputElement>document.getElementById("koment")).value;
  const id = parseInt(this.route.snapshot.paramMap.get('id'));

  this.recipeService.letsAddComment({content: inputValue, recipesID: id})
  .pipe(takeUntil(this.destroy$))
  .subscribe(value => {console.log(value); 
    this.recensions.update(actualRecension => [...actualRecension, value])} );
   


}

likeRecension(id: number){

  //const checkbox = document.getElementById('liked') as HTMLInputElement;
    //const isChecked = (event.target as HTMLInputElement).checked;
    
      this.recipeService.likeRecension(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    
}
disslikeRecension(id: number){

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
