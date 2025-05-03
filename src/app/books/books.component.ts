import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-books',
  imports: [RouterLink, CommonModule, MatButtonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {

  public books: Book[] = [];
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.http.get<Book[]>(`${environment.baseUrl}/api/Books`).subscribe({
      next: result => {
        this.books = result.slice(0, 100);
        console.log("API returned:", result);

      },
      error: error => console.error("API ERROR:", error)
    });
  }

  public showFullDescription: { [key: number]: boolean } = {};

  toggleDescription(bookId: number) {
    this.showFullDescription[bookId] = !this.showFullDescription[bookId];
  }
  
  

}
