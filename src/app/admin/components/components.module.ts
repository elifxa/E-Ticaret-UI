import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    CustomersModule,
    DashboardModule,
    OrdersModule,
    AuthorizeMenuModule,
    RoleModule,
  ],
})
export class ComponentsModule {}
