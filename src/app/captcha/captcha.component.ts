import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CODE} from './code';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent {
  code;

  constructor(private sanitizer: DomSanitizer) {
    this.code = sanitizer.bypassSecurityTrustHtml(CODE);
  }
}
