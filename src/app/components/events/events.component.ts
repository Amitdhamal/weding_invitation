import { Component } from '@angular/core';
import { WEDDING } from '../../config';
import { SectionTitleComponent } from '../section-title/section-title.component';
@Component({
  selector: 'app-events', standalone: true, imports: [SectionTitleComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent { w = WEDDING; }
