import { Routes } from '@angular/router';
import {PetTheCatComponent} from './pet-the-cat/pet-the-cat.component';
import {LavaCheckboxComponent} from './lava-checkbox/lava-checkbox.component';
import {CaptchaComponent} from './captcha/captcha.component';
import {FundTheProjectComponent} from './fund-the-project/fund-the-project.component';
import {CatchButtonComponent} from './catch-button/catch-button.component';
import {OtpDialsComponent} from './otp-dials/otp-dials.component';
import {SquigglyTextComponent} from './squiggly-text/squiggly-text.component';

export const routes: Routes = [
  {
    path: 'pet-the-cat',
    component: PetTheCatComponent,
    title: 'Pet The Cat'
  },
  {
    path: 'lava-checkbox',
    component: LavaCheckboxComponent,
    title: 'Lava Checkbox'
  },
  {
    path: 'captcha',
    component: CaptchaComponent,
    title: 'Captcha Scratch'
  },
  {
    path: 'fund-project',
    component: FundTheProjectComponent,
    title: 'Fund The Project'
  },
  {
    path: 'catch-button',
    component: CatchButtonComponent,
    title: 'Catch The Button'
  },
  {
    path: 'otp-dials',
    component: OtpDialsComponent,
    title: 'OTP Dials'
  },
  {
    path: 'squiggly-text',
    component: SquigglyTextComponent,
    title: 'Squiggly Text'
  }
];
