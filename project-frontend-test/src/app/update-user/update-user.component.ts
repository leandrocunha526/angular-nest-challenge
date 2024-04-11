import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  user: User = new User('', '');
  formGroup: FormGroup;
  errorMessage: string = '';
  message: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

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

  saveUser() {
    this.loading = true;
    this.authService
      .updateUser(this.user.id, this.user)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.message = 'Usuário atualizado com sucesso';
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log('Status:', error.status);
            console.log('Erro:', error.error.message);
            if (
              error.status === 400 &&
              error.error.message === 'User already existed'
            ) {
              this.errorMessage =
                'O nome de usuário já está em uso. Por favor, escolha outro.';
            } else {
              this.errorMessage =
                'Ocorreu um erro ao atualizar o usuário. Por favor, tente novamente mais tarde.';
            }
          }
          console.error(error);
        }
      );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.saveUser();
    } else {
      this.errorMessage =
        'Por favor, insira todos os dados e todos os dados são obrigatórios';
    }
  }
}
