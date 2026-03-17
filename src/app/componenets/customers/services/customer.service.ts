import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../services/api-service/api.service';
import { Customer } from '../../../core/models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  //#region service injections
  private readonly apiService = inject(ApiService);
  //#endregion
  //#region properties
  public customersSig = signal<Customer[]>([]);

  //#endregion



  //#region public methods
  /**
   * Method to get all customers
   * @returns void
   */
  public getCustomers(): void {
    this.apiService.getCustomers().subscribe((customers) => {
      console.log(customers);
      this.customersSig.set(customers as Customer[]);
    });
  }

  /**
   * Method to add a new customer
   * @param customer Customer to be added
   * @returns void
   */
  public addCustomer(customer: Customer): void {
    // Call the API service to add the customer
    this.apiService.addCustomer(customer).subscribe((newCustomer) => {
      // Update the customers signal with the new customer
      this.customersSig.update((customers) => [...customers, newCustomer as Customer]);
    });
  }
}
