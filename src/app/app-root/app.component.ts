import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { PetalsComponent } from '../components/petals/petals.component';
import { HeroComponent } from '../components/hero/hero.component';
import { InvitationNoteComponent } from '../components/invitation-note/invitation-note.component';
import { CoupleComponent } from '../components/couple/couple.component';
import { EventsComponent } from '../components/events/events.component';
import { LiveStreamComponent } from '../components/live-stream/live-stream.component';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { VenueRsvpComponent } from '../components/venue-rsvp/venue-rsvp.component';
import { SiteFooterComponent } from '../components/site-footer/site-footer.component';
import { CountdownBarComponent } from '../components/countdown-bar/countdown-bar.component';
import { NimantrakComponent } from '../components/nimantrak/nimantrak.component';
@Component({
  selector: 'app-root', standalone: true,
  imports: [PetalsComponent, HeroComponent, InvitationNoteComponent, CoupleComponent, EventsComponent, LiveStreamComponent, GalleryComponent, VenueRsvpComponent, NimantrakComponent, SiteFooterComponent, CountdownBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('backgroundMusic') private backgroundMusic?: ElementRef<HTMLAudioElement>;

  musicPlaying = signal(false);
  musicMuted = signal(false);

  ngAfterViewInit() {
    void this.startBackgroundMusic();
  }

  async toggleMusic() {
    const audio = this.backgroundMusic?.nativeElement;
    if (!audio) return;

    if (!this.musicPlaying()) {
      audio.muted = false;
      try {
        await audio.play();
        this.musicPlaying.set(true);
        this.musicMuted.set(false);
      } catch (error) {
        this.handlePlaybackError(error);
      }
      return;
    }

    audio.muted = !audio.muted;
    this.musicMuted.set(audio.muted);
  }

  private async startBackgroundMusic() {
    const audio = this.backgroundMusic?.nativeElement;
    if (!audio) return;

    try {
      await audio.play();
      this.musicPlaying.set(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') return;
      this.handlePlaybackError(error);
    }
  }

  private handlePlaybackError(error: unknown) {
    this.musicPlaying.set(false);
    this.musicMuted.set(false);
    console.error('Background music could not be played.', error);
  }
}
