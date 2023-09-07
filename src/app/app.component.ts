import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { Position } from './services/admin/aletify.service';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import {
  ComponentType,
  DynamicLoadComponentService,
} from './services/common/dynamic-load-component.service';

import * as bootstrap from 'bootstrap';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ETicaret';

  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dynamicLoadComponentService: DynamicLoadComponentService
  ) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message('Oturum kapatılmıştır!', 'Oturum Kapatıldı', {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.BottomRight,
    });
  }

  loadComponent() {
    const element = document
      .getElementsByClassName('modal-backdrop fade show')
      .item(0) as HTMLElement;

    element.style.display = '';
    this.dynamicLoadComponentService.loadComponent(
      ComponentType.BasketsComponent,
      this.dynamicLoadComponentDirective.viewContainerRef
    );
  }
}
