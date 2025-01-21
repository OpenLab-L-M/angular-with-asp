import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule, FormArray} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { RecipesService } from 'src/services/recipes.service';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { signal } from '@angular/core';
import { createRecipe } from './createRecipe';
import {catchError, Observable, Subject, takeUntil} from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import { MatCard } from '@angular/material/card';
import {MatTooltip} from "@angular/material/tooltip";
import {DialogOverviewExampleDialog} from "../user-profile/user-profile.component";
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import {
  MAT_DIALOG_DATA,
  MatDialog, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {CommonModule, NgFor, NgForOf, NgIf} from "@angular/common";
import {UserDTO} from "../user-profile/UserDTO";
import {UserService} from "../../services/user.service";
import {IngredienceDTO} from "./IngredienceDTO";
import {IngredientService} from "./IngredientService";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { IngredientsFilterPipe } from './ingredients-filter.pipe';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCard,
     MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule,
      MatSliderModule, FormsModule, MatIcon, MatTooltip, MatDialogClose, NgIf,CdkDrag,CdkDropList, NgFor, IngredientsFilterPipe
  ],
  templateUrl:'./create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {
  private cdr = Inject(ChangeDetectorRef);
  ingredience: IngredienceDTO = {Name: ''};
  inputString: string = '';
  ingredients: string[] = [];
  //ingredients: Array<string>;//= ["múka", "vajíčka", "mlieko", "cukor", "maslo", "soľ", "orechy", "ovocie", "zelenina", "ryža", "cesnak", "cibuľa", "paprika", "kura", "hovädzina", "bravčová", "losos", "tuniak", "olivový olej", "ocet", "korenie", "cestoviny", "zemiaky", "mrkva", "brokolica", "karfiol", "špenát", "jablká", "hrušky", "banány", "pomaranče", "citróny", "jahody", "čučoriedky", "maliny", "čerešne", "broskyne", "marhule", "ananás", "kiwi", "mango", "avokádo", "paradajky", "uhorky", "zeler", "cícer", "sója", "lentičky", "fazuľa", "hrach", "jogurt", "smotana", "syr", "káva", "čaj", "kakao"];

  
 
  getDataFromChild(e){
    debugger;
    this.inputString = e;
    this.ingredients.push(this.inputString);
  }
  ngOnInit() {
    this.setIngredients();
    
  }

  setIngredients(){
    this.recipesServíce.setIngredients()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => this.ingredients = result);
  }
  vybrane = [''];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  searchTerm: string  = '';
  disabled = false;
  max = 300;
  min = 0;
  showTicks = false;
  step = 10;
  thumbLabel = false;
  value = 0;

  postupForm = new FormGroup({
    postupy: new FormArray([], Validators.required)
  });
  get postupy() {
    return this.postupForm.get('postupy') as FormArray;
    console.log(this.postupy);
  }

  pridajPostup() {
    const postup = new FormControl('');
    this.postupy.push(postup);
  }

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingr: new FormControl(''),
    cas: new FormControl(null),
    diff: new FormControl(''),
    veganske: new FormControl(null),
    vegetarianske: new FormControl(null),
    nizkoKaloricke: new FormControl(null),
    img: new FormControl(''),
  });




  private destroy$ = new Subject<void>();
  newRecipe = signal<createRecipe>(undefined);
  constructor(private httpClient: HttpClient, private recipesServíce: RecipesService, private router: Router, private dialog: MatDialog, protected ingredientService: IngredientService){}

  onSubmit() {
    // TODO: Use EventEmitter with form value
  //  this.createRecipe();
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


  private createRecipe(value: Number) {
    this.recipesServíce.CreateRecipe({
      name: this.profileForm.controls['name'].value,
      description: this.profileForm.controls['description'].value,
      difficulty: this.profileForm.controls['diff'].value,
      imageURL: this.profileForm.controls['img'].value,
      ingrediencie: this.vybrane.join(),
      cas: this.profileForm.controls['cas'].value,
      veganske: this.profileForm.controls['veganske']?.value,
      vegetarianske: this.profileForm.controls['vegetarianske']?.value,
      nizkoKaloricke: this.profileForm.controls['nizkoKaloricke']?.value,
      postupicky: (this.postupForm.get('postupy') as FormArray).value,
      imageId: value
    }).pipe(takeUntil(this.destroy$))
    .subscribe(() => this.router.navigate(['/Recipes']));
    this.ingredientService.selectedIngredients = "";
  }


  openDialogis(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '500px',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }



  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.liveDemo = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  liveDemo:any;



  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post('https://localhost:7186/recipes/upload', imageFormData)
      .subscribe((value: number) => {
        this.createRecipe(value);
        }
      );
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


@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  styleUrl: 'dialog.scss',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    NgForOf,
    MatButtonModule,
    MatLabel
  ]
})
export class Dialog implements OnInit {
  ingredience: IngredienceDTO = {Name: ''};
  inputString: string = '';
  ingrediences: any = [];

  @Output() newItemEvent = new EventEmitter<string>();
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserDTO, private userService: UserService, private httpClient: HttpClient, private ingredientService: IngredientService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.httpClient.get<any>("https://localhost:7186/ingredience/getIngredience").subscribe(value =>
      this.ingrediences = value,
    )
    
  }
  selectedIngredients: string = '';
/*  onCheckboxChange(ingredient: any, event: any) {
    if (event.target.checked) {
      this.selectedIngredients += ingredient.name + ', ';
    } else {
      this.selectedIngredients = this.selectedIngredients.replace(ingredient.name + ', ', '');
    }
    console.log(this.selectedIngredients)
  }*/

  onCheckboxChange(ingredient: any, event: any) {
    if (event.target.checked) {
      this.ingredientService.selectedIngredients += ingredient.name + ', ';
    } else {
      this.ingredientService.selectedIngredients = this.ingredientService.selectedIngredients.replace(ingredient.name + ', ', '');
    }
  }


  sendIngredience() {
    debugger
    this.ingredience.Name = this.inputString;
    this.httpClient.post('https://localhost:7186/ingredience/addIngredience', this.ingredience).subscribe(response => {
        console.log(response);
        // Add the new ingredient to the list without refreshing
        this.ingrediences.push({ name: this.ingredience.Name });
        this.newItemEvent.emit(this.inputString);
        // Clear the input field
        this.inputString = '';
        // Trigger change detection
        this.cdr.detectChanges();
      }, error => {
        console.error('Error adding ingredient:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addIngredience($event: any) {
    this.ingrediences.add($event);
  }



}





