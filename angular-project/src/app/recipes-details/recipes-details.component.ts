import { Component, OnInit, inject, signal } from '@angular/core';
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
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { RecensionsDTO } from './recensions-dto';

import {CreatorDTO} from 'src/app/recipes/CreatorDTO';
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-recipes-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatIconAnchor, MatButtonModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatFormField, MatFormFieldModule, MatLabel, MatInput, MatInputModule, DatePipe],
  providers: [DatePipe],
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent implements OnInit{

  userImages: CreatorDTO[] = [];
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
  
  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) { }
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
    
    
    //console.log(this.currentDate);
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
  var date = this.datePipe.transform(new Date(), 'yyyy, MMM d, h:mm a');

  this.recipeService.letsAddComment({content: inputValue, recipesID: id, datetime: date})
  .pipe(takeUntil(this.destroy$))
  .subscribe(value => {console.log(value); 
    this.recensions.update(actualRecension => [...actualRecension, value])} );
   
    this.scrollToBottom();
    

}

  likeRecension(id: number) {
    
    this.recipeService.likeRecension(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.recensions.update(data => data.map(recension => recension.id === id ?
          { recipesID: value.recipesID,
            content: value.content,
            id: value.id, 
            amountOfLikes: value.amountOfLikes, 
            userName: value.userName,
            amountOfDisslikes: value.amountOfDisslikes } : recension))
        console.log(value);
      }

      );

  }
disslikeRecension(id: number){
  this.recipeService.disslikeRecension(id)
  .pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    this.recensions.update(data => data.map(recension => recension.id === id ?
      { recipesID: value.recipesID,
        content: value.content,
        id: value.id, 
        amountOfLikes: value.amountOfLikes, 
        userName: value.userName,
        amountOfDisslikes: value.amountOfDisslikes } : recension))
    console.log(value);
  }

  );
}


scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

Vymaz(id: number){
  
  this.recipeService.removeRecension(id)
  .pipe(takeUntil(this.destroy$))
  .subscribe(value => this.recensions.update(items => items.filter(item => item.id !== id)));
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
