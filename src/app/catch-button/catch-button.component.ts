import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CODE} from './code';

@Component({
  selector: 'app-catch-button',
  standalone: true,
  imports: [],
  templateUrl: './catch-button.component.html',
  styleUrl: './catch-button.component.css'
})
export class CatchButtonComponent {
  code;

  constructor(private sanitizer: DomSanitizer) {
    this.code = sanitizer.bypassSecurityTrustHtml(CODE);
  }
}
