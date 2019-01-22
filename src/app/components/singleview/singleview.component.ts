import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {
  sub: any;
  id: number;
  movieData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      this.http.get<any>('https://yts.am/api/v2/movie_details.json?movie_id=' + this.id + '&with_images=true&with_cast=true')
      .subscribe((res) => {
        this.movieData = res.data.movie;
        console.log(this.movieData);
      });
    });

  }

}
