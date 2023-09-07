import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { FileUploadModule } from './services/common/file-upload/file-upload.module';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { LoginComponent } from './ui/components/login/login.component';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

@NgModule({
  declarations: [AppComponent, DynamicLoadComponentDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UIModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['localhost:7213'],
      },
    }),
  ],
  providers: [
    { provide: 'baseUrl', useValue: 'https://localhost:7213/api', multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    },
    {
      provide: 'baseSignalRUrl',
      useValue: 'https://localhost:7213/',
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
