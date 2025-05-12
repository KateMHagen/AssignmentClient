import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Publisher } from '../publishers/publisher';


@Component({
  selector: 'app-country-edit',
  imports: [MatFormFieldModule,MatInputModule,ReactiveFormsModule,RouterLink],
  templateUrl: './publisher-edit.component.html',
  styleUrl: './publisher-edit.component.scss'
})
export class PublisherEditComponent implements OnInit{
  public publisher: Publisher | undefined;
  form!: FormGroup;
  id?: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router){
  
    }

    ngOnInit(): void {
      
      this.form = new FormGroup({
        name: new FormControl(``,Validators.required),

      });
      this.populateData();
    
    }

    populateData() {
      let id = this.activatedRoute.snapshot.paramMap.get("id");

      if (id) {
        this.id = +id; 
        this.http.get<Publisher>(`${environment.baseUrl}/api/Publishers/${this.id}`).subscribe({
          next: (result) => {
            this.publisher = result;
            this.form.patchValue(this.publisher);
          },
          error: (error) => console.error(error),
        });
      }
    }

    onSubmit() {
      let publisher = (this.id) ? this.publisher : <Publisher>{};
          if(publisher) {
            publisher.name = this.form.controls['name'].value;
          
            if(this.id) {
              this.http.put<Publisher>(`${environment.baseUrl}/api/Publishers/${publisher.id}`, publisher).subscribe({
                next: result => {
                  console.log(`Publisher ${publisher.id} has been updated.`)
                  this.router.navigate([`/publishers`]);
                },
                error: error => console.error(error)
              });
            }
      
            
      
          }
    }

}