import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/app/@core/services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    this.store.selectedLanguage$
      .pipe(takeUntil(this._ngDestroy$))
      .subscribe(country => {
        this.changePicture(country);
      });
  }

  changePicture(country) {
    switch (country) {
      case 'bg':
        this.locationImg =
          'https://am3pap003files.storage.live.com/y4pLzrEiOvVpdFlDPI0Tfs74ea6efz18IiDL03b5sqiDSaw8wqIXS9A9hOos' +
          '_jIf43cyJp0hPsycE0G4eVMtZkoKh8KE229ZMqd0NdpHN08MmNZN2vBxGswlbMCRKZNqPIk17Y3ZEUImrQzt_rxpTN9zph3lnCNk' +
          'll6U1WSXMRnDm4-0hZ_0zJ99-cREuexW-HP/location_BG.png?psid=1&width=450&height=440';
        break;
      case 'ro':
        this.locationImg =
          'https://am3pap003files.storage.live.com/y4pHNRinzQVauqsXt50dAGzR-qAl3079pIa3UuJgjsz8u9dEoyBtv7QTBmOL_' +
          'ujf566YSxBWDoFXbSx9X6oTej6F4NnBbq2rEpcyTWVXaaT-HE1n3-6uclk1oRC1sHHXGnp5MA-BHE1vLdW_ngLoid5kO0eTy5BVd_l' +
          'NghtJJZqOPIPmi0mE_RTnN2oAudByPKt/location_RO.png?psid=1&width=450&height=449';
        break;
      case 'gr':
        this.locationImg =
          'https://am3pap003files.storage.live.com/y4pPP5Tp42VF_RkFiX9ebAWoURuqUA5Mivrkqgp46-kJHUGbpJH6qEaLtA7QqR' +
          '6YCmML_3CSEijQKPUHacIQN6pxyXOKq91otbfKaR-MHz9O57OR9yokI-T7tPy-6fj1148VrlYVnSwKuILRBWV0FcnTQW75CrT9_4QZ' +
          'azvx61YcyOUjIJcUpi28kMVDf81o9WW/Location_CY.png?psid=1&width=450&height=450&cropMode=center';
        break;
      default:
        this.locationImg = '';
    }
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
