import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounce, form, FormField, required, maxLength } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../enteties';

@Component({
  selector: 'app-add-product',
  imports: [FormField, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {

  private productModelSig = signal<Product>({
    id: null,
    sku: '',
    price: 0,
    description: '',
  });

  public productForm = form(this.productModelSig, (schemaPath) => {
    debounce(schemaPath.sku, 500);
    required(schemaPath.sku);
    required(schemaPath.price);
    required(schemaPath.description);
    maxLength(schemaPath.description, 255)
  });

}
