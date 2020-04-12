import { Component, OnInit } from '@angular/core';
import constants from '../../../@core/utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  imgSrc = constants.images.pageNotFoundImg;
  userPage = this.router.url.replace('/', '');

  goHome() {
    this.router.navigate(['/']);
  }
}
