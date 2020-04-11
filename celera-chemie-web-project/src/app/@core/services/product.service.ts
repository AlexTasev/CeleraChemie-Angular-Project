import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<any> {
    return this.http.post('product', product);
  }

  updateProduct(productId: string, product: Product): Observable<any> {
    return this.http.put(`product/${productId}`, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`product/${productId}`);
  }

  getAllProducts(lang: string) {
    return this.http.get(`product/all/${lang}`);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`product/${productId}`);
  }

  getAllByCategory(category: string, lang: string) {
    return this.http.get(`product/${category}/${lang}`);
  }
}
