import { Component, OnInit } from '@angular/core';
import { Device, DeviceService } from '../../services/device.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-device-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})

export class DeviceListComponent implements OnInit{
  devices: Device[] = [];
  newDevice: Partial<Device> = {name: '', type: '', isOnline: false};
  editingDevice: Partial<Device> = {};

  constructor(private deviceService: DeviceService){}

  ngOnInit(): void{
    this.loadDevices();
  }

  loadDevices(): void{
    this.deviceService.getDevices().subscribe((data) => (this.devices = data));
  }

  addDevice(): void{
    if(!this.newDevice.name || !this.newDevice.type) return;

    this.deviceService.createDevice(this.newDevice).subscribe(() => {
      this.newDevice = {name: '', type: '', isOnline: false}
      this.loadDevices();
    });
  }

  removeDevice(id: number): void{
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.loadDevices();
    });
  }

  startEdit(device: Device): void {
    this.editingDevice = {...device};
  }

  saveEdit(): void {
    if(!this.editingDevice || !this.editingDevice.id) return;

    this.deviceService
    .updateDevice(this.editingDevice.id, this.editingDevice)
    .subscribe(() => {
      this.editingDevice = {};
      this.loadDevices();
    });
  }

  cancelEdit(): void{
    this.editingDevice = {};
  }
}
