import { Component } from '@angular/core';
import { WEDDING } from '../../config';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { SacredComponent } from '../sacred/sacred.component';
/** Groom (वर) and bride (वधू) profile cards. Edit details in config.ts → groomInfo / brideInfo. */
@Component({
  selector: 'app-couple', standalone: true, imports: [SectionTitleComponent, SacredComponent],
  templateUrl: './couple.component.html',
  styleUrls: ['./couple.component.scss'],
})
export class CoupleComponent {
  w = WEDDING;
  people = [
    { role: 'वर', prefix: 'चि.', name: WEDDING.groom, ...WEDDING.groomInfo },
    { role: 'वधू', prefix: 'चि. सौ. कां.', name: WEDDING.bride, ...WEDDING.brideInfo },
  ];
  hide(e: Event) { (e.target as HTMLElement).style.display = 'none'; }
}
