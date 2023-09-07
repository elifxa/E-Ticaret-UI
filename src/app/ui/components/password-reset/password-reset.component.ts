import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {
  AletifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/aletify.service';
import { UserAuthService } from 'src/app/services/common/model/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private alertifyService: AletifyService
  ) {
    super(spinner);
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.BallAtom);
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertifyService.message('Mail başarıyla gönderilmiştir.', {
        messageType: MessageType.Notify,
        position: Position.TopRight,
      });
    });
  }
}
