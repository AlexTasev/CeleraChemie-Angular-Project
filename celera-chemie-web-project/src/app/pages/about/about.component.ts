import { Component, OnInit } from '@angular/core';
import constants from '../../@core/utils/constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  aboutImg = constants.images.aboutPageImg;
}
