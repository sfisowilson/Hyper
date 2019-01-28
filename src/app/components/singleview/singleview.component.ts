import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {
  sub: any;
  id: string;
  movieData: any;
  trailer: any;
  yts: Object;

  constructor(private route: ActivatedRoute, private http: HttpClient, private data: MovieDataService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    // this.data.currentObj.subscribe(clipData => {
    //   this.movieData = clipData;
    // });
    if (!this.movieData)
    {
      console.log('no movie data');
      // this.http.get<any>(`https://yts.am/api/v2/list_movies.json?limit=1&query_term=${this.id}`).subscribe((res) => {
      //   // console.log(`https://yts.am/api/v2/list_movies.json?limit=1&query_term=${this.id}`);
      //   this.yts = res.data.movies;
        this.http.get<any>('http://localhost:5200/movieInfo/'+this.id).subscribe((res) => {
          this.movieData = res;
          console.log(this.movieData);
          this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.movieData.yts.yt_trailer_code}`);
        });
    }
    // else (this.movieData.yts)
    // {
    //  this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.movieData.yts.yt_trailer_code}`);
    // }
  }
}
