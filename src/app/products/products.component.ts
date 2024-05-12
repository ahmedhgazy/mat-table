import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TabViewModule } from 'primeng/tabview';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { TableModule } from 'primeng/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
export interface PeriodicElement {
  code: number;
  name: string;
  price: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { code: 1, name: 'Hydrogen', price: 1.0079, status: 'H' },
  { code: 2, name: 'Helium', price: 4.0026, status: 'He' },
  { code: 3, name: 'Lithium', price: 6.941, status: 'Li' },
  { code: 4, name: 'Beryllium', price: 9.0122, status: 'Be' },
  { code: 5, name: 'Boron', price: 10.811, status: 'B' },
  { code: 6, name: 'Carbon', price: 12.0107, status: 'C' },
  { code: 7, name: 'Nitrogen', price: 14.0067, status: 'N' },
  { code: 8, name: 'Oxygen', price: 15.9994, status: 'O' },
  { code: 9, name: 'Fluorine', price: 18.9984, status: 'F' },
  { code: 10, name: 'Neon', price: 20.1797, status: 'Ne' },
];

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    MatCardModule,
    TabViewModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'price', 'status'];
  prodService: ProductsService = inject(ProductsService);
  dataSource: MatTableDataSource<Product>;
  products: Product[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.prodService.getProducts().subscribe((data) => {
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
