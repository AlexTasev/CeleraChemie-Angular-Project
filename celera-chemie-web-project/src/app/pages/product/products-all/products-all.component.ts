import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ProductsAllComponent implements OnInit, OnDestroy {
  constructor(
    private toastrService: ToastrService,
    private productService: ProductService,
    private store: Store
  ) {}

  products: Product[] = [];
  category: string;
  selectedLang = 'en';
  backgroundImg = constants.images.defaultProductsImg;
  isAdmin: boolean;
  private _ngDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.store.selectedLanguage$.pipe(takeUntil(this._ngDestroy$)).subscribe((lang) => {
      this.selectedLang = lang || 'en';
      this.getAllProducts();
    });

    this.store.userRole$.pipe(takeUntil(this._ngDestroy$)).subscribe((role) => {
      role === 'Admin' ? (this.isAdmin = true) : (this.isAdmin = false);
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
    this.products = [];
    this.productService
      .getAllProducts(this.category, this.selectedLang)
      .pipe(takeUntil(this._ngDestroy$))
      .subscribe((products) => {
          Object.assign(this.products, products);
        }, () => this.toastrService.error('Unable to get products'),
      );
  }

  deleteProduct(productId) {
    const confirmed = confirm('Are you sure you want to delete this product?');

    if (confirmed) {
      this.productService.deleteProduct(productId)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe(() => {
          this.toastrService.success('Product deleted successfully');
          this.category = '';
          this.getAllProducts();
      }, () => 'Unable to delete product');
    }
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
