import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthService } from './services/health.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  healthStatus: any;
  private healthService = inject(HealthService);

  constructor(){
    this.healthService.getHealthStatus().subscribe({
      next: (data) => {
        this.healthStatus = data;
      },
      error: (err) => {
        console.error("Error fetching health status:", err);
      }
    });
  }
}
