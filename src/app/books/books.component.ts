import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-books',
  imports: [],
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
        console.log("API returned:", result); // 👈 Add this
        this.books = result;
      },
      error: error => console.error("API ERROR:", error)
    });
  }
  

}
