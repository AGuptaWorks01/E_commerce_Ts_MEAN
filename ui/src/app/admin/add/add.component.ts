import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interface/product';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  productId: number | null = null;
  productForm: FormGroup;
  selectedFiles: File[] = [];
  skuExistError: boolean = false;
  imagePreviews: string[] = [];

  constructor() {
    this.productForm = this.fb.group({
      sku: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      images: [null],
    });
  }

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
    this.productService.getProductById(id).subscribe((data: Product) => {
      this.productForm.patchValue({
        sku: data.sku,
        name: data.name,
        price: data.price,
      });
    });
  }

  // Capture image files
  onFileSelected(event: any): void {
    const files = event.target?.files;
    if (files) {
      this.selectedFiles = Array.from(files); // Store files for later use
      this.imagePreviews = []; // Reset previews

      // Create previews of the selected images
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result); // Add image preview to array
        };
        reader.readAsDataURL(file); // Convert file to base64 string
      });
    }
  }

  // Prepare FormData
  prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('sku', this.productForm.get('sku')?.value);
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value.toString());

    this.selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    return formData;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return; // Stop submission if the form is invalid
    }

    const formData = this.prepareFormData();

    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe(
        () => {
          alert('Product updated successfully!');
          this.router.navigate(['/']);
        },
        (error) => {
          if (
            error.status === 400 &&
            error.error.message === 'SKU already exists'
          ) {
            this.skuExistError = true;
          } else {
            alert('An error occurred while updating the product');
          }
        }
      );
    } else {
      this.productService.addProduct(formData).subscribe(
        () => {
          alert('Product added successfully!');
          this.router.navigate(['/']);
        },
        (error) => {
          if (
            error.status === 400 &&
            error.error.message === 'SKU already exists'
          ) {
            this.skuExistError = true;
          } else {
            alert('An error occurred while adding the product');
          }
        }
      );
    }
  }

  closeModal(): void {
    this.router.navigate(['/']);
  }
}
