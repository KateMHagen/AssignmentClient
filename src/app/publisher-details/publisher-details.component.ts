import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Book } from '../books/book';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.scss'],
  imports: [CommonModule]
})

export class PublisherDetailsComponent implements OnInit {
  books: Book[] = [];
  publisherId!: number;
  publisherName: string = '';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.getPublisherDetails();
  }

  getPublisherDetails() {
    this.publisherId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    

    this.http.get<any>(`${environment.baseUrl}/api/Publishers/${this.publisherId}`).subscribe({
      next: result => {
        this.publisherName = result.name;
      },
      error: error => console.error('Failed to load publisher:', error)
    });
    
    this.http.get<any>(`${environment.baseUrl}/api/Books`, { 
      params: new HttpParams().set('pageSize', '9999')
    }).subscribe({
      next: result => {
        console.log("Books response:", result);
        this.books = result.data.filter((b: { publisherId: number; }) => b.publisherId === this.publisherId);
      },
      error: error => console.error("Error loading books:", error)
    });

    
  }
}

