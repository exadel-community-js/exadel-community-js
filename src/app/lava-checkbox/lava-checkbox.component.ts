import { Component } from '@angular/core';
import {CODE} from './code';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-lava-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './lava-checkbox.component.html',
  styleUrl: './lava-checkbox.component.css'
})
export class LavaCheckboxComponent {
 code;

 constructor(private sanitizer: DomSanitizer) {
   this.code = sanitizer.bypassSecurityTrustHtml(CODE);
 }
}
