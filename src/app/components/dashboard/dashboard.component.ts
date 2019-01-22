import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  movieList: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  get f() { return this.searchForm.controls; }

  ngOnInit() {
      this.http.get<any>('https://yts.am/api/v2/list_movies.json').subscribe((res) => {
        this.movieList = res.data.movies;
        console.log(this.movieList);
      });


    this.submitted = false;
    this.searchForm = this.formBuilder.group({
      searchBar: [''],
      quality: [''],
      genre: [''],
      rating: [''],
      order: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.searchForm.value);
    // if (this.searchForm.invalid) {
    //   return;
    // }
    // this.data = this.registerForm.value;
    // this.data.confirmPassword = undefined;
    // console.log(this.data);
    // this.http.post('http://localhost:5200/test', this.data).subscribe((res) => {
    //   this.response = res;
    //   if (this.response.status === 200) {
    //     console.log(this.response.status);
    //     this.router.navigate(['dashboard']);
    //   } else if (this.response.status === 500) {
    //     console.log(this.response.status);
    //   }
    // });
  }

  singleMovie( id: number ): void {
    this.router.navigate(['singleview', id ]);
  }

}
