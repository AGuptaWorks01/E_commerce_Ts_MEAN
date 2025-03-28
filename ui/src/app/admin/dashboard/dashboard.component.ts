import { Component, inject } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products: any[] = []; // hold orginal data
  selectedProduct: any = {}

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(data);
    })
  }


  viewProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        console.log('Fetched product:', product);
        this.selectedProduct = {
          ...product,
          images: product.images.map((img: { image_url: string; }) => ({
            ...img,
            image_url: `http://localhost:3000/${img.image_url.replace(/\\/g, '/')}`
          }))
        };

        this.openModal();
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  openModal(): void {
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
