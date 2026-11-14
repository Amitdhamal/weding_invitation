import { Component, HostListener } from '@angular/core';
import { WEDDING } from '../../config';
import { SectionTitleComponent } from '../section-title/section-title.component';

type GalleryMedia = { src: string; type: 'image' | 'video' };

@Component({
  selector: 'app-gallery', standalone: true, imports: [SectionTitleComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  w = WEDDING;
  media: GalleryMedia[] = [
    ...WEDDING.photos.map(src => ({ src, type: 'image' as const })),
    ...WEDDING.videos.map(src => ({ src, type: 'video' as const })),
  ];
  selectedMedia: GalleryMedia | null = null;
  private returnFocus?: HTMLButtonElement;

  scroll(reel: HTMLDivElement, direction: -1 | 1) {
    reel.scrollBy({ left: direction * reel.clientWidth * 0.8, behavior: 'smooth' });
  }

  openMedia(media: GalleryMedia, trigger: HTMLButtonElement) {
    this.selectedMedia = media;
    this.returnFocus = trigger;
  }

  closeMedia() {
    this.selectedMedia = null;
    this.returnFocus?.focus();
    this.returnFocus = undefined;
  }

  @HostListener('document:keydown.escape')
  closeOnEscape() {
    if (this.selectedMedia) this.closeMedia();
  }

  hide(e: Event) {
    (e.target as HTMLElement).style.visibility = 'hidden';
  }
}
