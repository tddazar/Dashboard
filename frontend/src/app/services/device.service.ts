import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Device{
  id: number;
  name: string;
  type: string;
  isOnline: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl = 'https://localhost:7219';
  constructor(private http: HttpClient) { }

  getDevices(): Observable<Device[]>{
    return this.http.get<Device[]>(`${this.baseUrl}/devices`);
  }

  createDevice(device: Partial<Device>): Observable<Device> {
    return this.http.post<Device>(`${this.baseUrl}/devices`, device);
  }

  deleteDevice(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/devices/${id}`)
  }

  updateDevice(id: number, device: Partial<Device>): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/devices/${id}`, device);
  }
}
