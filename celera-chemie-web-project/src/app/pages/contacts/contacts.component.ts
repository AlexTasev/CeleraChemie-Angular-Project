import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/app/@core/services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import constants from '../../@core/utils/constants';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  private _ngDestroy$ = new Subject<void>();
  locationImg = '';

  ngOnInit(): void {
    this.store.selectedLanguage$.pipe(takeUntil(this._ngDestroy$))
      .subscribe((country) => {
        this.changePicture(country);
      });
  }

  changePicture(country: string) {
    switch (country) {
      case 'bg': this.locationImg = constants.images.locationImgBg; break;
      case 'ro': this.locationImg = constants.images.locationImgRo; break;
      case 'gr': this.locationImg = constants.images.locationImgGr; break;
      default: this.locationImg = '';
    }
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
