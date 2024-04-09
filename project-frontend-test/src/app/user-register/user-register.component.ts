import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
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

  ngOnInit(): void {}

  saveUser() {
    this.loading = true;
    this.authService
      .createUser(this.user)
      .subscribe(
        (data) => {
          console.log(data);
          this.message = 'Usuário cadastrado com sucesso';
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
                'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente mais tarde.';
            }
          }
          console.error(error);
        }
      )
      .add(() => {
        this.loading = false;
      });
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
