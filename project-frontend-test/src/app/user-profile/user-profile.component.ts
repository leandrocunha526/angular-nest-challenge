import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../classes/userProfile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: UserProfile;

  constructor(private authService: AuthService) {}

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
}
