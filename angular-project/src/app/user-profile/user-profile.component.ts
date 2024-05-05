import { Component, computed, effect, signal } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { UserDTO } from './UserDTO';
import { NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipesService } from 'src/services/recipes.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconAnchor } from '@angular/material/button';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgFor,
    NgIf, MatIconModule, MatIconAnchor, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  ourListOfRecipes = signal<RecipesDTO[]>([]);
  ourFavRecipes = signal<RecipesDTO[]>([]);
  user = signal<UserDTO>(undefined);
  imageUploaded = false;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService, private recipesSevice: RecipesService, private httpClient: HttpClient,){}

  ngOnInit(): void{
    this.userService.getCurrentUser()
    .subscribe(result => this.user.set(result));
    this.userService.usersRecipes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => this.ourListOfRecipes.set(result));
    this.userService.getFavourites()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => this.ourFavRecipes.set(result));

    this.getImageSrc(this.user().pictureURL);
  }

  deleteImage(): void {
    this.userService.deleteImage().subscribe( 
      () => {
        console.log('Image deleted successfully.');
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
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


    this.httpClient.post('https://localhost:7186/user/upload', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
          this.imageUploaded = true;
          window.location.reload();
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );
    }

    public getImageSrc(imageData: string): string {
      return `data:image/jpeg;base64,${imageData}`;
    }
  
}
