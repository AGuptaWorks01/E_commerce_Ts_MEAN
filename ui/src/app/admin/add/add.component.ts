import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interface/product';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  private productService = inject(ProductService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  productId: number | null = null;
  productData: Product = {
    sku: '',
    price: 0,
    name: '',
    images: []
  };

  // To store the selected image files
  selectedFiles: File[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(id: number): void {
    this.productService.getProductById(id).subscribe((data) => {
      this.productData = data;
    });
  }

  // Capture the image files when selected
  onFileSelected(event: any): void {
    const files = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  // Prepare FormData to send images + product data
  prepareFormData(): FormData {
    const formData = new FormData();

    // Append the product data fields
    formData.append('sku', this.productData.sku);
    formData.append('name', this.productData.name);
    formData.append('price', this.productData.price.toString());

    // Append images to FormData
    this.selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    return formData;
  }

  addProduct(): void {
    const formData = this.prepareFormData();

    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/']);
      });
    } else {
      this.productService.addProduct(formData).subscribe(() => {
        alert('Product added successfully!');
        this.router.navigate(['/']);
      });
    }
  }


  closeModal(): void {
    this.router.navigate(['/']);
  }
}
