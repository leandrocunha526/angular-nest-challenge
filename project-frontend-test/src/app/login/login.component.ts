import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  loginUser() {
    if (this.formGroup.valid) {
      this.loading = true; // Ativar o indicador de carregamento
      const credentials = this.formGroup.value;
      this.authService.login(credentials).subscribe(
        (response) => {
          if (response.body.token) {
            this.router.navigate(['/dashboard']);
          }
          this.loading = false; // Desativar o indicador de carregamento
        },
        (error) => {
          this.loading = false; // Desativar o indicador de carregamento em caso de erro
          if (error instanceof HttpErrorResponse) {
            console.log('Status:', error.status);
            console.error('Erro:', error.error);
            if (error.status === 401) {
              this.errorMessage = 'Usuário ou senha incorretos';
            } else {
              this.errorMessage =
                'Ocorreu um erro ao realizar o login. Por favor, tente novamente mais tarde.';
            }
          }
        }
      );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos';
    }
  }

  onSubmit() {
    this.loginUser();
  }
}
