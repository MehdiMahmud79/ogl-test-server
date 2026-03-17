import { Component, computed, effect, inject, ViewChild } from '@angular/core';
import { ProductsService } from './services/products.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddProduct } from './add-product/add-product';
import { take } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatSortModule, MatButtonModule, MatIconModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  //#region serice injections
  private readonly productsService = inject(ProductsService);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private readonly dialog = inject(MatDialog);


  //#endregion

  //#region properties
  public productsListSig = this.productsService.productsSig;
  public displayedColumns: string[] = ['id', 'sku', 'price', 'description'];
  public dataSource = computed(() => new MatTableDataSource(this.productsListSig()));

  @ViewChild(MatSort) sort!: MatSort;
  private _ = effect(() => {
    this.dataSource().sort = this.sort;
  });
  //#endregion

  //#region lifecycle hooks
  ngOnInit() {
    this.productsService.getProducts();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  /**
   * Method to add a new product
   * @returns void
   */
  public addProduct(): void {
    const dialogRef = this.dialog.open(AddProduct,
      {
        width: '900px',
        height: '600px',
        disableClose: true,
      },

    );
    dialogRef.afterClosed().pipe(take(1)).subscribe(({ newProduct }) => {
      if (newProduct) {
        this.productsService.addProduct(newProduct);
      }

    });
  }

  //#endregion

}
