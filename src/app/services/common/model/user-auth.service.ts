import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {}

  async login(
    userNameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          controller: 'auth',
          action: 'login',
        },
        { userNameOrEmail, password }
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      // this.router.navigate(['/admin/dash']);  login.component yerine burda da çalışır.

      this.toastrService.message(
        'Kullanıcı girişi başarıyla sağlanmıştır.',
        'Giriş Başarılı',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.BottomRight,
        }
      );
    }

    callBackFunction();
  }

  async refreshTokenLogin(
    refreshToken: string,
    callBackFunction?: (state) => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post(
        {
          action: 'refreshtokenlogin',
          controller: 'auth',
        },
        { refreshToken: refreshToken }
      );

    try {
      const tokenResponse: TokenResponse = (await firstValueFrom(
        observable
      )) as TokenResponse;

      if (tokenResponse) {
        localStorage.setItem('accessToken', tokenResponse.token.accessToken);
        localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      }

      callBackFunction(tokenResponse ? true : false);
    } catch {
      callBackFunction(false);
    }
  }

  async passwordReset(email: string, callBackFunction?: () => void) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auth',
        action: 'password-reset',
      },
      { email: email }
    );

    await firstValueFrom(observable);
    callBackFunction();
  }

  async verifyResetToken(
    resetToken: string,
    userId: string,
    callBackFunction?: () => void
  ): Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auth',
        action: 'verify-reset-token',
      },
      {
        resetToken: resetToken,
        userId: userId,
      }
    );

    const state: boolean = await firstValueFrom(observable);
    callBackFunction();
    return state;
  }
}
