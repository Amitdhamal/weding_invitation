import { Component } from '@angular/core';
import { PetalsComponent } from '../components/petals/petals.component';
import { HeroComponent } from '../components/hero/hero.component';
import { InvitationNoteComponent } from '../components/invitation-note/invitation-note.component';
import { CoupleComponent } from '../components/couple/couple.component';
import { EventsComponent } from '../components/events/events.component';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { VenueRsvpComponent } from '../components/venue-rsvp/venue-rsvp.component';
import { SiteFooterComponent } from '../components/site-footer/site-footer.component';
import { CountdownBarComponent } from '../components/countdown-bar/countdown-bar.component';
@Component({
  selector: 'app-root', standalone: true,
  imports: [PetalsComponent, HeroComponent, InvitationNoteComponent, CoupleComponent, EventsComponent, GalleryComponent, VenueRsvpComponent, SiteFooterComponent, CountdownBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
