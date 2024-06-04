import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { RecipesService } from 'src/services/recipes.service';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { signal } from '@angular/core';
import { createRecipe } from './createRecipe';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatSliderModule, FormsModule,
    ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
  
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    postup: new FormControl('', Validators.required),
    ingr: new FormControl('', Validators.required),
    cas: new FormControl(null),
    diff: new FormControl(''),
    veganske: new FormControl(null),
    vegetarianske: new FormControl(null),
    nizkoKaloricke: new FormControl(null),
    img: new FormControl(''),
  });
  private destroy$ = new Subject<void>();
  newRecipe = signal<createRecipe>(undefined);
  constructor(private httpClient: HttpClient, private recipesServíce: RecipesService, private router: Router){}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.createRecipe();
    console.warn(this.profileForm.value);
    
    
  }

  updateIngredients(event: any) {
    const ingrControl = this.profileForm.get('ingr');
    if (event.target.checked) {
      // Add the ingredient to the form control if checked
      const currentValue = ingrControl.value || '';
      const newIngredient = event.target.value;
      const updatedValue = currentValue ? currentValue + ', ' + newIngredient : newIngredient;
      ingrControl.setValue(updatedValue);
    } else {
      // Remove the ingredient from the form control if unchecked
      const currentValue = ingrControl.value || '';
      const ingredientToRemove = event.target.value;
      const updatedValue = currentValue.replace(ingredientToRemove, '').replace(/,\s*,/, ',').trim();
      ingrControl.setValue(updatedValue);
    }
  }
  

  private createRecipe() {
    debugger
    this.recipesServíce.CreateRecipe({
      name: this.profileForm.controls['name'].value,
      postup: this.profileForm.controls['postup'].value,
      difficulty: this.profileForm.controls['diff'].value,
      imageURL: this.profileForm.controls['img'].value,
      ingrediencie: this.profileForm.controls['ingr'].value,
      cas: this.profileForm.controls['cas'].value,
      veganske: this.profileForm.controls['veganske']?.value,
      vegetarianske: this.profileForm.controls['vegetarianske']?.value,
      nizkoKaloricke: this.profileForm.controls['nizkoKaloricke']?.value,
    }).pipe(takeUntil(this.destroy$))
    .subscribe(() => this.router.navigate(['/Recipes']));
  }


   

  // uploadedImage: File;
  // dbImage: any;
  // postResponse: any;
  // successResponse: string;
  // image: any;

  // public onImageUpload(event) {
  //   this.uploadedImage = event.target.files[0];
  // }


  // imageUploadAction() {
  //   const imageFormData = new FormData();
  //   imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


  //   this.httpClient.post('http://localhost:4200/CreateRecipe', imageFormData, { observe: 'response' })
  //     .subscribe((response) => {
  //      if (response.status === 200) {
  //         this.postResponse = response;
  //         this.successResponse = this.postResponse.body.message;
  //       } else {
  //         this.successResponse = 'Image not uploaded due to some error!';
  //       }
  //     }
  //     );
  //   }

  // viewImage() {
  //   this.httpClient.get('http://localhost:4200/CreateRecipe' + this.image)
  //     .subscribe(
  //       res => {
  //         this.postResponse = res;
  //         this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
  //       }
  //     );
  // }
}
