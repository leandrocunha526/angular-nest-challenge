import { Component, OnInit } from '@angular/core';
import { Devices } from '../classes/devices';
import { DevicesService } from '../services/devices.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  devices: Devices[];
  errorMessage: string = '';
  message: string = '';
  searchQuery: string;

  constructor(private devicesService: DevicesService, private route: Router) {}

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.devicesService.getDevice().subscribe(
      (data: any) => {
        if (data.success) {
          this.devices = data.device;
        } else {
          this.errorMessage = 'Erro ao obter dispositivos';
        }
      },
      (error) => {
        console.error('Erro ao obter dispositivos', error);
        this.errorMessage = 'Erro ao obter dispositivos';
      }
    );
  }

  deleteDevice(id: string) {
    this.devicesService.deleteById(id).subscribe(
      () => {
        this.message = 'Dispositivo excluído com sucesso';
        this.getDevices();
      },
      (error) => {
        console.error('Erro ao excluir dispositivo', error);
        this.errorMessage = 'Erro ao excluir dispositivo';
      }
    );
  }

  details(id: string) {
    this.route.navigate(['detail', id]);
  }

  onSearchInput() {
    if (this.searchQuery.trim()) {
      this.devicesService
        .getDeviceByQuery(this.searchQuery)
        .pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 404) {
                this.message = 'Nenhum dispositivo encontrado';
                this.devices = [];
              } else if (error.status === 500) {
                this.handleError('Erro ao buscar dispositivos');
              }
            } else {
              this.handleError('Erro ao buscar dispositivos');
            }
            return throwError(error);
          })
        )
        .subscribe((response: any) => {
          if (response && response.devices) {
            this.devices = response.devices;
            if (this.devices.length === 0) {
              this.message = 'Nenhum dispositivo encontrado';
              this.devices = [];
            } else {
              this.message = null;
            }
          }
        });
    }
  }

  private handleError(message: string) {
    console.error(message);
    this.errorMessage = message;
    this.message = '';
  }

  update(id: string) {
    this.route.navigate(['update', id]);
  }
}
