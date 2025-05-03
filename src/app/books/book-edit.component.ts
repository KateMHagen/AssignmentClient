import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Book } from './book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Publisher } from '../publishers/publisher';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-book-edit',
  imports: [
    MatFormFieldModule, 
    MatLabel, 
    RouterLink, 
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss'
})
export class BookEditComponent implements OnInit {

  title?: string;
  form!: FormGroup;
  book?: Book;
  id?: number;
  publishers?: Publisher[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      description: new FormControl(''),
      pages: new FormControl(''),
      rating: new FormControl(''),
      publisher: new FormControl(''),
      publisherId: new FormControl('')
    });
    this.loadData();
  }

  loadData() {
    this.loadPublishers();
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(this.id) {
      this.http.get<Book>(`${environment.baseUrl}/api/Books/${this.id}`).subscribe({
        next: result => {
          this.book = result;
          this.title = "Edit - " + this.book.title;
          this.form.patchValue(this.book);
  
        },
        error: error => console.error(error)
      });
    } else {
      this.title = "Create a new book"; 
    }
    
  }

  loadPublishers() {
    let params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name");

    this.http.get<any>(`${environment.baseUrl}/api/Publishers`, { params }).subscribe({
      next: results => {
        this.publishers = results;
        console.log("Loaded publishers:", this.publishers);
      },
      error: error => console.error(error)
    });
  }

  onSubmit() {
    let book = (this.id) ? this.book : <Book>{};
    if(book) {
      book.title = this.form.controls['title'].value;
      book.author = this.form.controls['author'].value;
      book.description = this.form.controls['description'].value;
      book.pages = this.form.controls['pages'].value;
      book.rating = this.form.controls['rating'].value;
      book.publisherId = this.form.controls['publisherId'].value;

      // Edit book
      if(this.id) {
        this.http.put<Book>(`${environment.baseUrl}/api/Books/${book.id}`, book).subscribe({
          next: result => {
            console.log(`Book ${book.id} has been updated.`)
            this.router.navigate([`/books`]);
          },
          error: error => console.error(error)
        });
      } else {
        // Add new book
        this.http.post<Book>(`${environment.baseUrl}/api/Books`, book).subscribe({
          next: result => {
            console.log(`Book ${result.id} has been created.`)
            this.router.navigate([`/books`]);
          },
          error: error => console.error(error)
        });
      }

      

    }
  }

}
