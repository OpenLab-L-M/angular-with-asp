import {Component, computed, effect, signal, Inject, Output, inject} from '@angular/core';
import { UserService } from 'src/services/user.service';
import { UserDTO } from './UserDTO';
import { NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { NgModel } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipesService } from 'src/services/recipes.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { MatIconAnchor } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecipesDTO } from '../recipes/RecipesDTO';
import { MatTableDataSource } from '@angular/material/table';
import {forkJoin, Subject, takeUntil} from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import {ImageDTO} from "../recipes/ImageDTO";
import {CreatorDTO} from "../recipes/CreatorDTO";
import { RecensionsDTO } from '../recipes-details/recensions-dto';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgFor,
    NgIf, MatIconModule, MatIconAnchor, MatButtonModule, MatCardModule, RouterLink, MatDialogClose, MatFormField, MatTooltip],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

 // ourListOfRecipes = signal<RecipesDTO[]>([]);
  ourListOfRecipes: RecipesDTO[] = [];

 // ourFavRecipes = signal<RecipesDTO[]>([]);
  ourFavRecipes: RecipesDTO[] = [];

//  user = signal<UserDTO>(undefined);
  user: UserDTO;
// mine Written Comments
  public recensions: RecensionsDTO[] = [];
  imageUploaded = false;
  private destroy$ = new Subject<void>();

  animal: string;
  name: string;

  constructor(private userService: UserService, private recipesSevice: RecipesService, private httpClient: HttpClient, public dialog: MatDialog, private route: ActivatedRoute){}



  ktoryRecept(id: number): void{
    
    const checkbox = document.getElementById('favourite') as HTMLInputElement;
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked){
      this.recipesSevice.addToFav(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    }
    }
     
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

    dialogRef.componentInstance.imageDeleted.subscribe(() => {
      //this.user.update(user => ({...user, pictureURL: undefined}));
      this.user.pictureURL = undefined;
    });
  }
  recipeService = inject(RecipesService);
  imageDTO: ImageDTO[] = [];

  userImages: CreatorDTO[] = [];
  ngOnInit(): void{
    const userName = this.route.snapshot.paramMap.get('userName');
    forkJoin({
      currentUser: this.userService.userProfile(userName),
      myComments: this.userService.getUsersRecensions(userName),
      usersRecipes: this.userService.usersRecipes(userName).pipe(takeUntil(this.destroy$)),
      favourites: this.userService.getFavourites().pipe(takeUntil(this.destroy$)),
      allImages: this.recipeService.getAllImages(),
      userCreators: this.userService.getAllCreatorImages()
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.user = result.currentUser;
        this.recensions = result.myComments;
        this.ourListOfRecipes = result.usersRecipes;
        this.ourFavRecipes = result.favourites;
        this.imageDTO = result.allImages;
        this.userImages = result.userCreators;
        this.comprim();
        this.getImageSrc(this.user.pictureURL); // Assuming this is a method that sets the image source
      });
  }

  comprim() {
    this.ourFavRecipes.forEach(a =>
      a.comprimedImage = `data:image/jpeg;base64,${this.userImages.find(b => b.id === a.userID).pictureURL}`,
    )
  }
  public getImageSrc(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }
  public getImage(id: number, ) {
    return `data:image/jpeg;base64,${this.imageDTO.find(image => image.id === id).image}`;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrl: 'dialog-content-example-dialog.css',
  standalone: true,
  imports: [MatDialogClose, NgIf, MatFormField, MatButtonModule, MatInputModule, MatFormFieldModule],
})
export class DialogOverviewExampleDialog {
  imageDTO: ImageDTO[] = [];

  @Output() imageDeleted = new EventEmitter<void>();

  user = signal<UserDTO>(undefined);
  imageUploaded = false;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserDTO, private userService: UserService, private httpClient: HttpClient,private route: ActivatedRoute) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  recipeService = inject(RecipesService);
   

  ngOnInit(): void{
    const userName = this.route.snapshot.paramMap.get('userName');
    this.userService.userProfile(userName)
   .subscribe(result => this.user.set(result));

   this.getImageSrc(this.user().pictureURL);


  }

  deleteImage(): void {
    this.userService.deleteImage().subscribe(
      () => {
        console.log('Image deleted successfully.');
        this.user.update(user => ({...user, pictureURL: undefined}));
        this.imageDeleted.emit();
        // window.location.reload();
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }
  private destroy$ = new Subject<void>();
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
