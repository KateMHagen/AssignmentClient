import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-books',
  imports: [MatPaginator],
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
  

}
