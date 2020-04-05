import { Component, OnInit, ɵɵNgOnChangesFeature, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/@core/services/product.service';
import constants from '../../../@core/utils/constants';
import { Store } from 'src/app/@core/services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.scss'],
})
export class ProductsAllComponent implements OnInit {
  constructor(private router: Router, private toastrService: ToastrService, private productService: ProductService, private store: Store) {}

  products: Product[] = [];
  category: string;
  selectedLang = 'en';
  backgroundImg = constants.images.defaultProductsImg;
  private _ngDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.store.selectedLanguage$.pipe(takeUntil(this._ngDestroy$)).subscribe((lang) => {
      this.selectedLang = lang;
      this.getAllProducts();
    });
  }

  selectCategory(e) {
    this.category = e.target.name;

    switch (this.category) {
      case 'instruments': this.backgroundImg = constants.images.instrumentsImg; break;
      case 'filters': this.backgroundImg = constants.images.filtersImg; break;
      case 'chemicals': this.backgroundImg = constants.images.chemicalsImg; break;
      case 'glassware': this.backgroundImg = constants.images.glasswareImg; break;
      case 'consumables': this.backgroundImg = constants.images.consumablesImg; break;
      default: this.backgroundImg = constants.images.defaultProductsImg; break;
    }

    this.getAllProducts();
  }

  getAllProducts() {
    if (this.category) {
      this.products = [];
      this.productService
        .getAllByCategory(this.category, this.selectedLang)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe((products) => {
            Object.assign(this.products, products);
          }, () => this.toastrService.error('Unable to get products'),
        );
    } else {
      this.products = [];
      this.productService
        .getAllProducts(this.selectedLang)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe((products) => {
            Object.assign(this.products, products);
          }, () => this.toastrService.error('Unable to get products'),
        );
    }
  }

  deleteProduct() {}

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
