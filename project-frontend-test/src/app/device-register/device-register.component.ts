import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevicesService } from '../services/devices.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-device-register',
  templateUrl: './device-register.component.html',
  styleUrl: './device-register.component.css',
})
export class DeviceRegisterComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string = '';
  message: string = '';
  loading: boolean = false; // Adiciona uma variável para controlar o estado de loading

  constructor(
    private formBuilder: FormBuilder,
    private devicesService: DevicesService
  ) {
    this.formGroup = this.formBuilder.group({
      manufacturer: ['', Validators.required],
      description: ['', Validators.required],
      informationAccess: ['', Validators.required],
      commandList: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  device() {
    if (this.formGroup.valid) {
      const device = this.formGroup.value;
      this.loading = true; // Define o loading como true quando a requisição é iniciada
      this.devicesService
        .registerDevice(device)
        .subscribe(
          () => {
            this.message = 'Salvo com sucesso';
          },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              console.log('Status:', error.status);
              console.error('Erro:', error.error);
              if (error.status === 400) {
                this.errorMessage =
                  'Dados inválidos. Por favor, tente novamente.';
              } else {
                this.errorMessage =
                  'Ocorreu um erro ao realizar o login. Por favor, tente novamente mais tarde.';
              }
            }
          }
        )
        .add(() => {
          this.loading = false; // Define o loading como false quando a requisição é finalizada
        });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos';
    }
  }

  onSubmit() {
    this.device();
  }
}
