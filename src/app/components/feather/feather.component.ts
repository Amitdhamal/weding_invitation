import { Component } from '@angular/core';
import { WEDDING } from '../../config';
@Component({
  selector: 'app-feather', standalone: true,
  templateUrl: './feather.component.html',
  styleUrls: ['./feather.component.scss'],
})
export class FeatherComponent {
  src = WEDDING.feather;
  fallback() { this.src = 'assets/feather-up.svg'; }
}
