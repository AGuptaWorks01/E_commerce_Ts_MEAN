import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
deleteUser(arg0: any) {
throw new Error('Method not implemented.');
  }
  
editUser(_t13: any) {
throw new Error('Method not implemented.');
}

  products: any[] = []; // hold orginal data

  private productService = inject(ProductService)

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      // console.log(data);
    })
  }
}
