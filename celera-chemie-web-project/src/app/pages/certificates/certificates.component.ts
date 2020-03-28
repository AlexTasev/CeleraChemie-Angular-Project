import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/app/@core/services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    this.store.selectedLanguage$
      .pipe(takeUntil(this._ngDestroy$))
      .subscribe(country => {
        this.getLocaleData(country);
      });
  }

  getLocaleData(country) {
    switch (country) {
      case 'bg':
        this.imgSrc =
          'http://celera-chemie.com/test/wp-content/uploads/2019/02/ISO9001-BG.jpg';
        this.pdfLocation =
          'http://celera-chemie.com/bg/wp-content/uploads/2019/02/ISO9001-BG.pdf';
        break;
      case 'ro':
        this.imgSrc =
          'http://celera-chemie.com/test/wp-content/uploads/2019/02/iso-celera-chemie-RO.jpg';
        this.pdfLocation =
          'https://celera-chemie.com/cy/wp-content/uploads/2019/02/iso-celera-chemie-RO.pdf';
        break;
      case 'gr':
        this.imgSrc =
          'http://celera-chemie.com/test/wp-content/uploads/2019/02/CERTIFICATE-ISO-9001-CELERA-CY-GR.jpg';
        this.pdfLocation =
          'https://celera-chemie.com/cy/wp-content/uploads/2019/02/CERTIFICATE-ISO-9001-CELERA-CY-GR.pdf';
        break;
      case 'en':
        this.imgSrc =
          'http://celera-chemie.com/test/wp-content/uploads/2019/02/ISO9001-BG-EN.jpg';
        this.pdfLocation =
          'http://celera-chemie.com/bg/wp-content/uploads/2019/02/ISO9001-EN.pdf';
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
