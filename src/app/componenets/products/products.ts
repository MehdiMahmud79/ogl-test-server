import { Component, computed, effect, inject, ViewChild } from '@angular/core';
import { ProductsService } from './services/products.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  //#region serice injections
  private readonly productsService = inject(ProductsService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  //#endregion

  //#region properties
  public productsListSig = this.productsService.productsSig;
  public displayedColumns: string[] = ['id', 'sku', 'price', 'description'];
  public dataSource = computed(() => new MatTableDataSource(this.productsListSig()));

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
  }

  //#endregion
  /**
   *
   */
  constructor() {
    effect(() => {
      this.dataSource().sort = this.sort;
    });

  }
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

}
