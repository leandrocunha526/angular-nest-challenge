import { Component, OnInit } from '@angular/core';
import { Devices } from '../classes/devices';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.css'],
})
export class DevicesDetailComponent implements OnInit {
  id: string;
  device: Devices;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DevicesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getDevice();
  }

  getDevice() {
    this.deviceService.getDeviceById(this.id).subscribe(
      (data: Devices) => {
        this.device = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao obter o dispositivo por ID', error);
        this.loading = false;
      }
    );
  }
}
