import { Component } from '@angular/core';
import { WEDDING } from '../../config';
import { SectionTitleComponent } from '../section-title/section-title.component';

@Component({
  selector: 'app-nimantrak',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './nimantrak.component.html',
  styleUrls: ['./nimantrak.component.scss'],
})
export class NimantrakComponent {
  contactPeople = WEDDING.contactPeople;
}
