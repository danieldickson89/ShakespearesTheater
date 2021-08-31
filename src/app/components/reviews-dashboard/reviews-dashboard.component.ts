import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';
import { faStar, faStarHalfAlt, faCaretSquareLeft, faCaretSquareRight, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import { faStar as faWhiteStar } from '@fortawesome/free-regular-svg-icons';
import { Sorter } from 'src/app/models/sorter';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-reviews-dashboard',
  templateUrl: './reviews-dashboard.component.html',
  styleUrls: ['./reviews-dashboard.component.css']
})
export class ReviewsDashboardComponent implements OnInit {
  faStar = faStar;
  faWhiteStar = faWhiteStar;
  faStarHalfAlt = faStarHalfAlt;
  faCaretSquareLeft = faCaretSquareLeft;
  faCaretSquareRight = faCaretSquareRight;
  faFastBackward = faFastBackward;
  faFastForward = faFastForward;
  increments: number[] = [10,25,40];
  sorters: Sorter[] = [
    { value: 'Most Recent', viewValue: 'Most Recent', asc: false },
    { value: 'Top Ratings', viewValue: 'Highest - Lowest', asc: false },
    { value: 'Lowest Ratings', viewValue: 'Lowest - Highest', asc: true }
  ];
  selectedSorter: String = 'Most Recent';
  reviews: Review[] = [];
  displayedReviews: Review [] = [];
  selectedReview: any = {};
  selectedPage: number = 1;
  selectedIncrement: number = 10;

  constructor(
    private reviewService: ReviewsService,
    public globalService: GlobalService
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

  selectReview(review: Review) {
    this.reviewService.getReview(review.id).subscribe((data: Review) => {
      this.selectedReview = data;
    });
  }

  calcStars(rating: number): [wholeStars: number, decimal: number] {
    const wholeStars = Math.floor(rating / 1);
    const decimalAsString = (rating % 1).toFixed(1);
    const decimal: number = +decimalAsString; 
    return [wholeStars, decimal];
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

  incrementChanged(increment: number) {
    this.selectedIncrement = increment;
    this.paginateList('');
  }

  sorterChanged(sorter: String) {
    if (sorter == 'Most Recent') {
      this.sortReviews('date', false);
    } else if (sorter == 'Top Ratings') {
      this.sortReviews('rating', false);
    } else if (sorter == 'Lowest Ratings') {
      this.sortReviews('rating', true);
    }
  }

  sortReviews(prop: string, asc: boolean) {
    // Logic for ascending order for each review property that's sortable
    if (asc) {
      if (prop == 'date') {
        this.reviews.sort((a,b) => (a.publish_date < b.publish_date) ? -1 : 1);
      } else if (prop == 'rating') {
        this.reviews.sort((a,b) => (a.rating < b.rating) ? -1 : 1);
      }
    } 
    // Logic for descending order for each review property that's sortable
    else {
      if (prop == 'date') {
        this.reviews.sort((a,b) => (a.publish_date < b.publish_date) ? 1 : -1);
      } else if (prop == 'rating') {
        this.reviews.sort((a,b) => (a.rating < b.rating) ? 1 : -1);
      }
    }
    this.displayedReviews = this.reviews.slice((this.selectedPage - 1) * this.selectedIncrement, 
                                (this.selectedPage * this.selectedIncrement) > this.reviews.length ? this.reviews.length : (this.selectedPage * this.selectedIncrement));
  }

  paginateList(changeType: String) {
    if (changeType == 'First') {
      this.selectedPage = 1;
    } else if (changeType == 'Previous') {
      this.selectedPage--;
    } else if (changeType == 'Next') {
      this.selectedPage++;
    } else if (changeType == 'Last') {
      this.selectedPage = this.reviews.length / this.selectedIncrement;
    }
    this.displayedReviews = this.reviews.slice((this.selectedPage - 1) * this.selectedIncrement, 
                                (this.selectedPage * this.selectedIncrement) > this.reviews.length ? this.reviews.length : (this.selectedPage * this.selectedIncrement));
  }

}
