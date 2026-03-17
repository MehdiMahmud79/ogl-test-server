import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../componenets/products/enteties';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  //# region service injections
  protected httpClient: HttpClient = inject(HttpClient);
  //# endregion

  //#region properties
  private readonly apiUrl = environment.apiUrl;
  //#endregion

  //#region public methods
  /** Method to get all products */
  getProducts() {
    const url = `${this.apiUrl}/product`;
    return this.httpClient.get(url, { responseType: 'json' });
  }
  /** Method to add a new product */
  addProduct(product: Product) {
    const url = `${this.apiUrl}/product`;
    return this.httpClient.post(url, product, { responseType: 'json' });
  }

  /** Method to get all customers */
  getCustomers() {
    const url = `${this.apiUrl}/customer`;
    return this.httpClient.get(url, { responseType: 'json' });
  }
  //#endregion


}
