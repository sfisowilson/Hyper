import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  movieList: any;
  movieData: any;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private data: MovieDataService) { }

  get f() { return this.searchForm.controls; }

  ngOnInit() {
      this.http.get<any>('http://localhost:5200/testing').subscribe((res) => {
        this.movieList = res;
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

    // this.data.currentObj.subscribe(clipData => this.movieData = clipData)
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
    this.data.changeData(this.movieData);
    const links = [];
    var str = {};
    for (let i = 0; i < this.movieList.length; i++) {
      if (this.movieList[i].id === id) {
        // str = {query: this.movieList[i].title};
        // this.http.post('http://localhost:5200/getlinks', str).subscribe((res) => {
        //   // this.movieList = res.data.movies;
        //   console.log(res);
        //   const extra = this.movieList[i];
        //   extra.extra = res;
          this.data.changeData(this.movieList[i]);
        // });

        break;
      }
    }
    this.router.navigate(['singleview', id ]);
  }

}
