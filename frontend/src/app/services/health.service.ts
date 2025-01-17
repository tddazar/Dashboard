import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HealthService {

  private baseUrl = 'https://localhost:7219';

  constructor(private http: HttpClient) {}

  getHealthStatus(): Observable<any> {
    console.log('Calling API:', `${this.baseUrl}/health`);
    return this.http.get(`${this.baseUrl}/health`);
  }
}
