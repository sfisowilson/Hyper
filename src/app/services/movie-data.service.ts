import { Injectable } from '@angular/core';  
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  private movieData = new BehaviorSubject<any>({});

  currentObj = this.movieData.asObservable();

  constructor() { }

  changeData(clipData: any) {
    this.movieData.next(clipData)
  }
}
