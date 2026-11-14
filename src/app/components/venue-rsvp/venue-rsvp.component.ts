import { Component } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { SacredComponent } from '../sacred/sacred.component';
import { MapCardComponent } from '../map-card/map-card.component';
import { RsvpCardComponent } from '../rsvp-card/rsvp-card.component';
/** Maroon band holding two separate cards: map (left) and RSVP (right). */
@Component({
  selector: 'app-venue-rsvp', standalone: true, imports: [SectionTitleComponent, SacredComponent, MapCardComponent, RsvpCardComponent],
  templateUrl: './venue-rsvp.component.html',
  styleUrls: ['./venue-rsvp.component.scss'],
})
export class VenueRsvpComponent {}
