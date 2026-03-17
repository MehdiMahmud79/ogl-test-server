import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounce, form, FormField, required, maxLength, min, schema } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../enteties';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const initialProductModel: Product = {
  id: null,
  sku: '',
  price: null,
  description: '',
};
const productSchema = schema<Product>((rootPath) => {
  required(rootPath.sku, {
    message: 'SKU is required.',
  });
  required(rootPath.price, {
    message: 'Price must be greater than 0.',
  });

  required(rootPath.description, {
    message: 'Description is required.',
  });
  maxLength(rootPath.description, 255, {
    message: 'Description must be less than 255 characters.',
  });
})
@Component({
  selector: 'app-add-product',
  imports: [FormField, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  ///#region service injections
  readonly dialogRef = inject(MatDialogRef<AddProduct>);
  private _snackBar = inject(MatSnackBar);
  //#endregion

  private productModelSig = signal<Product>({ ...initialProductModel });

  public productForm = form(this.productModelSig, productSchema);

  public onSubmit(): void {
    if (this.productForm().valid()) {
      console.log(this.productForm().value());
      this.dialogRef.close({ newProduct: this.productForm().value() });

    } else {

      this._snackBar.open(`Form is invalid!`, 'Close', {
        duration: 3000,
      });
    }
  }
  public closeForm(): void {
    this.dialogRef.close({ newProduct: null });
  }
}
