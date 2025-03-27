import { Routes } from '@angular/router';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddComponent } from './admin/add/add.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'productList', component: ProductListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addProduct', component: AddComponent },
];
