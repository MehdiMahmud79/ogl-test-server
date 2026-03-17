import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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

  /** Method to get all customers */
  getCustomers() {
    const url = `${this.apiUrl}/customer`;
    return this.httpClient.get(url, { responseType: 'json' });
  }
  //#endregion


}
