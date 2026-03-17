import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounce, form, FormField, required, maxLength, min, schema } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '../enteties';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const initialCustomerModel: Customer = {
  id: null,
  name: '',
};
const customerSchema = schema<Customer>((rootPath) => {
  required(rootPath.name, {
    message: 'Name is required.',
  });
})
@Component({
  selector: 'app-add-customer',
  imports: [FormField, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.css',
})
export class AddCustomer {
  ///#region service injections
  readonly dialogRef = inject(MatDialogRef<AddCustomer>);
  private _snackBar = inject(MatSnackBar);
  //#endregion

  private customerModelSig = signal<Customer>({ ...initialCustomerModel });

  public customerForm = form(this.customerModelSig, customerSchema);

  public onSubmit(): void {
    if (this.customerForm().valid()) {
      console.log(this.customerForm().value());
      this.dialogRef.close({ newCustomer: this.customerForm().value() });

    } else {

      this._snackBar.open(`Form is invalid!`, 'Close', {
        duration: 3000,
      });
    }
  }
  public closeForm(): void {
    this.dialogRef.close({ newCustomer: null });
  }
}
