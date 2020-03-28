import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/@core/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  logout() {
    this.store.clear();
  }
}
