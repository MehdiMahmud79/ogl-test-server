import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../enteties';
import { ApiService } from '../../../services/api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  //#region service injections
  private readonly apiService = inject(ApiService);
  //#endregion
  //#region properties
  public productsSig = signal<Product[]>([]);

  //#endregion



  //#region public methods
  public getProducts(): void {
    this.apiService.getProducts().subscribe((products) => {
      console.log(products);
      this.productsSig.set(products as Product[]);
    });
  }

}
