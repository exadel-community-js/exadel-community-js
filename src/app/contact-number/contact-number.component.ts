import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CODE} from './code';

@Component({
  selector: 'app-contact-number',
  standalone: true,
  imports: [],
  templateUrl: './contact-number.component.html',
  styleUrl: './contact-number.component.css'
})
export class ContactNumberComponent {
  code;

  constructor(private sanitizer: DomSanitizer) {
    this.code = sanitizer.bypassSecurityTrustHtml(CODE);
  }
}
