import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Devices } from '../classes/devices';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css'],
})
export class UpdateDeviceComponent implements OnInit {
  id: string;
  device: Devices = new Devices();
  formGroup: FormGroup;
  message: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private devicesService: DevicesService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      manufacturer: ['', Validators.required],
      description: ['', Validators.required],
      informationAccess: ['', Validators.required],
      commandList: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.devicesService.getDeviceById(this.id).subscribe(
      (data) => {
        this.device = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;

      this.devicesService.updateDevice(this.id, this.device).subscribe(
        () => {
          this.isLoading = false;
          this.message = `Device ${this.id} foi atualizado com sucesso`;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage =
        'Por favor, insira todos os dados e todos os dados são obrigatórios';
    }
  }
}
