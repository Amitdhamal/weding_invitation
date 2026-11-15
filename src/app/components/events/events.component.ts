import { Component } from '@angular/core';
import { WEDDING } from '../../config';
import { SectionTitleComponent } from '../section-title/section-title.component';
@Component({
  selector: 'app-events', standalone: true, imports: [SectionTitleComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  w = WEDDING;

  toDevanagari(value: string): string {
    return value.replace(/[0-9]/g, digit => '०१२३४५६७८९'.charAt(Number(digit)));
  }
}
