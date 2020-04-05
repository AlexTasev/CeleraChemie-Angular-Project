import { Component, OnInit, OnDestroy } from '@angular/core';
import constants from '../../@core/utils/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor() {}

  images = constants.images.homePageImgs;
  imgSrc = constants.images.defaultHomeImg;
  interval: any;

  ngOnInit() {
    this.getImage();
  }

  private getImage() {
    let index = 0;
    this.interval = setInterval(() => {
      this.imgSrc = this.images[index];
      if (index < this.images.length - 1) {
        index++;
      } else {
        index = 0;
      }
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
