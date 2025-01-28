import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {DialogOverviewExampleDialog} from "../../user-profile/user-profile.component";
import { ChangeDetectorRef } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import {UserDTO} from "../../user-profile/UserDTO";
import {UserService} from "../../../services/user.service";
import {IngredienceDTO} from "../IngredienceDTO";
import {IngredientService} from "../IngredientService";
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'dialog',
  standalone: true,
  imports: [FormsModule,
    MatDialogTitle,
    MatDialogContent,
    NgForOf,
    MatButtonModule,
    MatLabel],
  templateUrl: './dialogis.component.html',
  styleUrl: './dialogis.component.scss'
})
export class DialogisComponent implements OnInit {
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
        this.ingrediences.push({ name: this.ingredience.Name });
        
        this.dialogRef.close({ data: this.ingredience.Name });
        this.inputString = '';
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
