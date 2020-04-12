import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/app/@core/services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import constants from '../../@core/utils/constants';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  private _ngDestroy$ = new Subject<void>();
  pdfLocation: string;
  imgSrc: string;

  ngOnInit(): void {
    this.store.selectedLanguage$.pipe(takeUntil(this._ngDestroy$)).subscribe((country) => {
      this.getLocaleData(country || 'en');
    });
  }

  getLocaleData(country: string) {
    switch (country) {
      case 'bg':
        this.imgSrc = constants.images.certificateBgImg;
        this.pdfLocation = constants.images.certificateBgDoc;
        break;
      case 'ro':
        this.imgSrc = constants.images.certificateRoImg;
        this.pdfLocation = constants.images.certificateRoDoc;
        break;
      case 'gr':
        this.imgSrc = constants.images.certificateGrImg;
        this.pdfLocation = constants.images.certificateGrDoc;
        break;
      case 'en':
        this.imgSrc = constants.images.certificateEnImg;
        this.pdfLocation = constants.images.certificateEnDoc;
        break;
      default:
        this.imgSrc = '';
    }
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
