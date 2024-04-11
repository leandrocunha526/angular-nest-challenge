import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../classes/userProfile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: UserProfile;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getUserProfile().subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        console.log('Erro ao obter perfil do usuário:', error);
      }
    );
  }
  goToUpdateUser() {
    this.router.navigate(['/user-update', this.user.id]);
  }
}
