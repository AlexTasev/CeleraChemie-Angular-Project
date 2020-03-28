import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  public languages: string[] = ['en', 'bg', 'gr', 'ro'];
  public currentLanguage = 'en';

  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    const languageSelected = localStorage.getItem('language');
    translate.addLangs(this.languages);

    if (languageSelected) {
      this.currentLanguage = languageSelected;
    } else {
      translate.use(browserLang.match(/bg|ro|gr|en|/) ? browserLang : 'en');
    }
    this.translate.use(this.currentLanguage);
  }

  ngOnInit(): void {}

  changeLanguage(selectedLanguage: string) {
    localStorage.setItem('language', selectedLanguage);
    this.currentLanguage = selectedLanguage;
    this.translate.use(this.currentLanguage);
  }
}
