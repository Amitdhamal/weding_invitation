import { Component, HostListener } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { WEDDING } from '../../config';
import { SectionTitleComponent } from '../section-title/section-title.component';

type GalleryMedia = { src: string; type: 'image' | 'video' };

@Component({
  selector: 'app-gallery', standalone: true, imports: [SectionTitleComponent, NgTemplateOutlet],
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
  isOpen = false;
  isOpening = false;
  currentIndex = 0;
  flipDirection: -1 | 0 | 1 = 0;
  private flipTargetIndex = 0;
  private flipTimer?: ReturnType<typeof setTimeout>;
  private openingTimer?: ReturnType<typeof setTimeout>;
  private returnFocus?: HTMLButtonElement;

  get currentMedia(): GalleryMedia {
    return this.media[this.currentIndex];
  }

  get targetMedia(): GalleryMedia {
    return this.media[this.flipTargetIndex];
  }

  get leftMedia(): GalleryMedia | null {
    const index = this.flipDirection === 1
      ? this.currentIndex
      : this.flipDirection === -1
        ? this.flipTargetIndex - 1
        : this.currentIndex - 1;
    return index >= 0 ? this.media[index] : null;
  }

  get displayMedia(): GalleryMedia {
    return this.flipDirection === 0 ? this.currentMedia : this.targetMedia;
  }

  get flipFrontMedia(): GalleryMedia {
    return this.flipDirection === 1 ? this.currentMedia : this.targetMedia;
  }

  get flipBackMedia(): GalleryMedia {
    return this.flipDirection === 1 ? this.targetMedia : this.currentMedia;
  }

  get displayedPageNumber(): number {
    return (this.flipDirection === 0 ? this.currentIndex : this.flipTargetIndex) + 1;
  }

  get leftPageNumber(): number {
    return this.flipDirection === 1
      ? this.currentIndex + 1
      : this.flipDirection === -1
        ? this.flipTargetIndex
        : this.currentIndex;
  }

  openAlbum() {
    this.currentIndex = 0;
    if (this.isOpening || this.isOpen) return;
    this.isOpening = true;
    this.openingTimer = setTimeout(() => this.finishOpening(), 760);
  }

  finishOpening() {
    if (!this.isOpening) return;
    if (this.openingTimer !== undefined) clearTimeout(this.openingTimer);
    this.openingTimer = undefined;
    this.isOpening = false;
    this.isOpen = true;
  }

  closeAlbum() {
    if (this.flipDirection === 0) this.isOpen = false;
  }

  turnPage(direction: -1 | 1) {
    if (this.flipDirection !== 0) return;

    const targetIndex = this.currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= this.media.length) return;

    this.flipTargetIndex = targetIndex;
    this.flipDirection = direction;
    this.flipTimer = setTimeout(() => this.finishFlip(), 800);
  }

  finishFlip() {
    if (this.flipDirection === 0) return;
    if (this.flipTimer !== undefined) clearTimeout(this.flipTimer);
    this.flipTimer = undefined;
    this.currentIndex = this.flipTargetIndex;
    this.flipDirection = 0;
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
