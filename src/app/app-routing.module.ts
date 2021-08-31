import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsDashboardComponent } from './components/reviews-dashboard/reviews-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/reviews', pathMatch: 'full' },
  { path: 'reviews', component: ReviewsDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
