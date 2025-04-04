import { Component, inject } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { transformImageUrl } from '../../utils/image-url-transformer';
import { ModalService } from '../../service/modal.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  products: any[] = []; // hold orginal data
  selectedProduct: any = {};

  private productService = inject(ProductService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = transformImageUrl(data, environment.baseUrl);
      console.log("load", this.products);
    });
  }

  // viewProduct(productId: number): void {
  //   this.productService.getProductById(productId).subscribe(
  //     (product) => {
  //       const dataimages = []
  //       dataimages.push(product)
  //       this.products = transformImageUrl(dataimages, environment.baseUrl);
  //       console.log("data", this.products)
  //       this.selectedProduct = this.products[0]
  //       // this.selectedProduct = product;
  //       console.log("images", this.selectedProduct)
  //       this.modalService.openModal('productModal');
  //     },
  //     (error) => {
  //       console.error('Error fetching product:', error);
  //     }
  //   );
  // }


  viewProduct(productId:number) {
    console.log(productId);
    this.productService.getProductById(productId).pipe(
      map(product=> {
        const transformedProducts = transformImageUrl([product], environment.baseUrl)
        return transformedProducts[0]
      })
    ).subscribe(
      (transformedProduct) => {
        this.selectedProduct = transformedProduct
        console.log(transformedProduct);
        this.modalService.openModal('productModal')
      }
    )
  }


  closeModal(): void {
    this.modalService.closeModal('productModal');
  }



}
