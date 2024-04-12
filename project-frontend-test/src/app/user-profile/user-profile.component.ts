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
  message: string = '';
  errorMessage: string = '';
  deviceIdToDelete: number = 0;

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
    this.router.navigate(['profile-update']);
  }

  delete(r) {
    this.authService.delete().subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
      (error) => {
        console.log('Erro ao excluir usuário:', error);
        this.errorMessage =
          'Erro ao excluir usuário, você possui dispositivos cadastrados';
      }
    );
  }

  openConfirmationModal() {
    this.deviceIdToDelete = this.user.id;
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      (window as any).$(modal).modal('show');
    }
  }

  confirmDelete() {
    if (this.deviceIdToDelete) {
      this.delete(this.deviceIdToDelete);
      this.deviceIdToDelete = null;
      const modal = document.getElementById('confirmationModal');
      if (modal) {
        (window as any).$(modal).modal('hide');
      }
    }
  }

  cancelDelete() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      (window as any).$(modal).modal('hide');
    }
  }
}
