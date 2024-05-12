import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http: HttpClient = inject(HttpClient);
  apiUrl = 'http://localhost:3000/products';

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((data: Product[]) => {
        return data;
      })
    );
  }
}
