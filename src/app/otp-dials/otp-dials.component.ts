import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CODE} from './code';

@Component({
  selector: 'app-otp-dials',
  standalone: true,
  imports: [],
  templateUrl: './otp-dials.component.html',
  styleUrl: './otp-dials.component.css'
})
export class OtpDialsComponent {
  code;

  constructor(private sanitizer: DomSanitizer) {
    this.code = sanitizer.bypassSecurityTrustHtml(CODE);
  }
}
