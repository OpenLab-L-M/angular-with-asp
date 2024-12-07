import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { AuthenticationService } from '../api-authorization/authentication.service';
import { NgIf } from '@angular/common';
import { UserService } from 'src/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    MatIconModule,
    MatButton,
    NgIf,
    CommonModule
  ],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {
  authService = inject(AuthenticationService);
  private router = inject(Router);
  private userService = inject(UserService);
  private route: ActivatedRoute;
 userName: string;
  private destroy$ = new Subject<void>();
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  getCurrentUserName(){
    debugger;
    this.userService.getCurrentUser()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => this.userName = result.userName);
    console.log(this.userName);
  }
  isActive(url: string): boolean {
    return this.router.url === url;
  }

}
