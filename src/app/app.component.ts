import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { Position } from './services/admin/aletify.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor(private toastrService: CustomToastrService) {
    // toastrService.message('Hallo', '', {
    //   messageType: ToastrMessageType.Success,
    //   position: ToastrPosition.TopRight,
    // });
  }
}

/*$(document).ready(() => {
  alert('hello');
});*/
