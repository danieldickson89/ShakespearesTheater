import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faWhiteStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-reviews-dashboard',
  templateUrl: './reviews-dashboard.component.html',
  styleUrls: ['./reviews-dashboard.component.css']
})
export class ReviewsDashboardComponent implements OnInit {
  faStar = faStar;
  faWhiteStar = faWhiteStar;
  faStarHalfAlt = faStarHalfAlt;
  sorters = ['Most recent', 'Top Ratings', 'Lowest Ratings'];
  sorter = 'Most recent';
  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewsService
  ) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getReviews().subscribe((data: any[])=>{
      this.reviews = data;
      this.sortReviews('date', false);
    }); 
  }

  calcStars(rating: number): [wholeStars: number, decimal: number] {
    const wholeStars = Math.floor(rating / 1);
    const decimalAsString = (rating % 1).toFixed(1);
    const decimal: number = +decimalAsString; 
    return [wholeStars, decimal];
  }

  formatDate(reviewDate: Date): string {
    var date = new Date(reviewDate);
    var month = '';
    switch (date.getMonth() + 1) {
      case 1:
        month = 'January';
        break;
      case 2:
        month = 'February';
        break;
      case 3:
        month = 'March';
        break;
      case 4:
        month = 'April';
        break;
      case 5:
        month = 'May';
        break;
      case 6:
        month = 'June';
        break;
      case 7:
        month = 'July';
        break;
      case 8:
        month = 'August';
        break;
      case 9:
        month = 'September';
        break;
      case 10:
        month = 'October';
        break;
      case 11:
        month = 'November';
        break;
      case 12:
        month = 'December';
        break;
      default:
        break;
    }
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  }

  truncatedReview(body: String): String {
    var words = body.split(' ');
    var isLong = words.length > 10 ? true : false;
    var truncatedBody = '';
    if (isLong) {
      var i = 1;
      while (i < 10) {
        truncatedBody += words[i] + ' ';
        i++;
      }
      truncatedBody += words[10] + '...';
      return truncatedBody;
    } else {
      return body;
    }
  }

  sortReviews(prop: string, asc: boolean) {
    // Logic for ascending order for each review property that's sortable
    if (asc) {
      if (prop == 'date') {
        this.reviews.sort((a,b) => new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime());
      }
    } 
    // Logic for descending order for each review property that's sortable
    else {
      if (prop == 'date') {
        this.reviews.sort((a,b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
      }
    }
  }

}
