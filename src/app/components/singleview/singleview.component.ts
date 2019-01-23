import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {
  sub: any;
  id: number;
  movieData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private data: MovieDataService) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id'];
    //   console.log(this.id);
    //   this.http.get<any>('http://localhost:5200/getMovieInfo?movieId=tt6857112').subscribe((res) => {
    //     this.movieData = res;
    //     console.log(this.movieData);
    //   });
    // });

    this.data.currentObj.subscribe(clipData => {
      this.movieData = clipData;
      console.log(this.movieData);
    });
  }

}
