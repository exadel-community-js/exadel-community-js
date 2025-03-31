import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CODE} from './code';

@Component({
  selector: 'app-fund-the-project',
  standalone: true,
  imports: [],
  templateUrl: './fund-the-project.component.html',
  styleUrl: './fund-the-project.component.css'
})
export class FundTheProjectComponent {
  code;

  constructor(private sanitizer: DomSanitizer) {
    this.code = sanitizer.bypassSecurityTrustHtml(CODE);
  }
}
