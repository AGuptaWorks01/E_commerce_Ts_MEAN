import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../interface/product';
import { environment } from '../../../environments/environment';
import { transformImageUrl } from '../../utils/image-url-transformer';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // hold orginal data

  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = transformImageUrl(data, environment.baseUrl);
      console.log(this.products);
    });
  }

  editProduct(productId: number | undefined): void {
    if (productId !== undefined) {
      this.router.navigate(['/addProduct', productId]);
      // console.log('Editing Product ID:', productId);
    } else {
      console.error('Product ID is undefined');
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
          alert('Product deleted successfully!');
        },
        (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete the product.');
        }
      );
    }
  }
}
