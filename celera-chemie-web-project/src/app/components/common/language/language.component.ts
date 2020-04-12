import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from 'src/app/@core/services/store.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  public languages: string[] = ['en', 'bg', 'gr', 'ro'];
  public currentLanguage = 'en';

  constructor(private translate: TranslateService, private store: Store) {
    const browserLang = translate.getBrowserLang();
    const languageSelected = localStorage.getItem('language');
    translate.addLangs(this.languages);

    if (languageSelected) {
      this.currentLanguage = languageSelected;
      this.store.selectedLanguage = this.currentLanguage;
    } else {
      translate.use(browserLang.match(/bg|ro|gr|en|/) ? browserLang : 'en');
    }
    this.translate.use(this.currentLanguage);
  }

  changeLanguage(selectedLanguage: string) {
    localStorage.setItem('language', selectedLanguage);
    this.currentLanguage = selectedLanguage;
    this.store.selectedLanguage = this.currentLanguage;
    this.translate.use(this.currentLanguage);
  }
}
