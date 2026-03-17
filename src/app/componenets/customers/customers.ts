import { Component, computed, effect, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from './services/customer.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddProduct } from '../products/add-product/add-product';
import { take } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [MatTableModule, MatSortModule, MatButtonModule, MatIconModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {

  //#region serice injections
  private readonly customerService = inject(CustomerService);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private readonly dialog = inject(MatDialog);
  //#endregion
  public customersListSig = this.customerService.customersSig;
  public displayedColumns: string[] = ['id', 'name'];
  public dataSource = computed(() => new MatTableDataSource(this.customersListSig()));
  @ViewChild(MatSort) sort!: MatSort;
  private _ = effect(() => {
    this.dataSource().sort = this.sort;
  });
  //#region lifecycle hooks
  ngOnInit() {
    this.customerService.getCustomers();
  }
  addCustomer() {
    const dialogRef = this.dialog.open(AddProduct,
      {
        width: '900px',
        height: '600px',
        disableClose: true,
      },

    );
    dialogRef.afterClosed().pipe(take(1)).subscribe(({ newProduct }) => {
      if (newProduct) {
        this.customerService.addCustomer(newProduct);
      }

    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
