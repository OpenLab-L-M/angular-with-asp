import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule
    ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    diff: new FormControl(''),
    img: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  // constructor(private httpClient: HttpClient){}

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
