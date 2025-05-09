import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from './book';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-books',
  imports: [
    RouterLink, 
    CommonModule, 
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {

 // public books: Book[] = []; <th>ID</th>
   
  public displayedColumns: string[] = ["Id", "Title", "Author", "Description", "Pages", "Rating", "Publisher Id", "Publisher"];
  public pageIndex: number = 0;
  public pageSize: number = 10;
  constructor(private http: HttpClient){}

  public books!: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.getBooks(pageEvent);
  }

  getBooks(event: PageEvent) {
    let params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString());

    this.http.get<any>(`${environment.baseUrl}/api/Books`, { params }).subscribe({
      next: result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.books = new MatTableDataSource<Book>(result.data);

      },
      error: error => console.error("API ERROR:", error)
    });
  }

  public showFullDescription: { [key: number]: boolean } = {};

  toggleDescription(bookId: number) {
    this.showFullDescription[bookId] = !this.showFullDescription[bookId];
  }
  

  

}
