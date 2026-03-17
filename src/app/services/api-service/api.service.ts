import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../componenets/products/enteties';
import { Customer } from '../../componenets/customers/enteties';
import { Observable } from 'rxjs';

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
  getProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/product`;
    return this.httpClient.get<Product[]>(url, { responseType: 'json' });
  }
  /** Method to add a new product */
  addProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/product`;
    return this.httpClient.post<Product>(url, product, { responseType: 'json' });
  }

  /** Method to get all customers */
  getCustomers(): Observable<Customer[]> {
    const url = `${this.apiUrl}/customer`;
    return this.httpClient.get<Customer[]>(url, { responseType: 'json' });
  }

  /** Method to add a new customer */
  addCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/customer`;
    return this.httpClient.post<Customer>(url, customer, { responseType: 'json' });
  }
  //#endregion


}
