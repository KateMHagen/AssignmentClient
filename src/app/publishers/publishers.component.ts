import { Component } from '@angular/core';
import { Publisher } from './publisher';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-publishers',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './publishers.component.html',
  styleUrl: './publishers.component.scss'
})
export class PublishersComponent {

  public publishers: Publisher[] = [];
    constructor(private http: HttpClient){}
  
    ngOnInit(): void {
      this.getPublishers();
    }
  
    getPublishers() {
      this.http.get<Publisher[]>(`${environment.baseUrl}/api/Publishers`).subscribe({
        next: result => {
          this.publishers = result.slice(0, 100);
          console.log("API returned:", result);
  
        },
        error: error => console.error("API ERROR:", error)
      });
    }
    
}
