import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, MatListModule, MatSidenavModule],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
})
export class ComponentsModule {}
