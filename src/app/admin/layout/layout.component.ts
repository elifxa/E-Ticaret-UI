import { Component, OnInit } from '@angular/core';
import {
  AletifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/aletify.service';
declare var alertify: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
