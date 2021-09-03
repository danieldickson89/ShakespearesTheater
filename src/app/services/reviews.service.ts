import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private reviewsUrl = 'https://shakespeare.podium.com/api/reviews';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                               'x-api-key': 'H3TM28wjL8R4#HTnqk?c' 
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewsUrl, {headers: this.httpOptions.headers})
      .pipe(
        tap(_ => console.log('fetched reviews')),
        catchError(this.handleError<Review[]>('getReviews', []))
      );
  }

  getReview(id: String) {
    var reviewUrl = this.reviewsUrl + '/' + id;
    return this.http.get<Review>(reviewUrl, {headers: this.httpOptions.headers})
      .pipe(
        tap(_ => console.log('fetched review')),
        catchError(this.handleError<Review>('getReview'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
