import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    // let obs = this.http.get('https://api.github.com/users/graphixxx');
    //  obs.subscribe((data) => console.log(data));
  }
}
  