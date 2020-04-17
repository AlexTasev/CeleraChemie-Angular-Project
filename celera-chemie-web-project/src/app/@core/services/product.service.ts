import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createOrUpdateProduct(productId: string, product: Product): Observable<any> {
    return productId ? this.http.put(`product/${productId}`, product) : this.http.post('product', product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`product/${productId}`);
  }

  getAllProducts(category: string, lang: string) {
    return category ? this.http.get(`product/${category}/${lang}`) : this.http.get(`product/all/${lang}`);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`product/${productId}`);
  }
}
