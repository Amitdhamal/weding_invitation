import { Component, OnDestroy, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WEDDING } from '../../config';
import { SectionTitleComponent } from '../section-title/section-title.component';

type AkshataParticle = {
  id: number;
  left: number;
  drift: number;
  delay: number;
  duration: number;
};

const LOCAL_STREAM_KEY = 'vivah-invite.liveStreamUrl';

function getYouTubeVideoId(value: string): string | null {
  if (!value.trim()) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;

  let videoId = '';
  if (url.hostname === 'youtu.be') {
    videoId = url.pathname.slice(1);
  } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(url.hostname)) {
    if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v') ?? '';
    } else {
      videoId = url.pathname.match(/^\/(?:live|embed|shorts)\/([^/]+)$/)?.[1] ?? '';
    }
  }

  return /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null;
}

@Component({
  selector: 'app-live-stream',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss'],
})
export class LiveStreamComponent implements OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  isAdminMode = typeof window !== 'undefined' && window.location.hash === '#admin22051991';
  streamInput = WEDDING.liveStreamUrl;
  streamUrl: SafeResourceUrl | null = null;
  hasInvalidStreamUrl = false;
  adminMessage = '';
  akshata: AkshataParticle[] = [];
  private burstSequence = 0;
  private burstTimer?: ReturnType<typeof setTimeout>;
  public w = WEDDING;
  blankYoutubeUrlMsg = `लाइव्ह स्ट्रीमची लिंक विवाह शुभमुहुर्ताच्या काही मिनिटे आधी जोडली जाईल. <br> अक्षता बटन लाइव्ह स्ट्रीम चालू झाल्यावरच कार्यरत होईल.`;

  constructor() {
    const localStreamUrl = this.readLocalStreamUrl();
    this.streamInput = localStreamUrl ?? WEDDING.liveStreamUrl;
    this.setStreamUrl(this.streamInput);
  }

  saveStreamUrl(value: string) {
    const url = value.trim();
    if (!getYouTubeVideoId(url)) {
      this.adminMessage = 'कृपया वैध YouTube व्हिडिओ किंवा लाइव्ह लिंक भरा.';
      return;
    }

    try {
      window.localStorage.setItem(LOCAL_STREAM_KEY, url);
    } catch (error) {
      console.error('Could not save the local stream URL.', error);
      this.adminMessage = 'या ब्राउझरमध्ये लिंक सेव्ह करता आली नाही.';
      return;
    }

    this.streamInput = url;
    this.setStreamUrl(url);
    this.adminMessage = 'लिंक या ब्राउझरमध्ये सेव्ह झाली आहे.';
  }

  resetStreamUrl() {
    try {
      window.localStorage.removeItem(LOCAL_STREAM_KEY);
    } catch (error) {
      console.error('Could not remove the local stream URL.', error);
      this.adminMessage = 'या ब्राउझरमधून लिंक काढता आली नाही.';
      return;
    }

    this.streamInput = WEDDING.liveStreamUrl;
    this.setStreamUrl(this.streamInput);
    this.adminMessage = 'मूळ साइटवरील लिंक पुन्हा वापरत आहोत.';
  }

  throwAkshata() {
    const burst = ++this.burstSequence;
    this.akshata = Array.from({ length: 32 }, (_, index) => ({
      id: burst * 32 + index,
      left: 3 + ((index * 37 + burst * 19) % 94),
      drift: ((index * 29 + burst * 13) % 120) - 60,
      delay: (index % 8) * 55,
      duration: 1300 + (index % 5) * 110,
    }));

    if (this.burstTimer !== undefined) clearTimeout(this.burstTimer);
    this.burstTimer = setTimeout(() => {
      this.akshata = [];
      this.burstTimer = undefined;
    }, 2400);
  }

  ngOnDestroy() {
    if (this.burstTimer !== undefined) clearTimeout(this.burstTimer);
  }

  private readLocalStreamUrl(): string | null {
    try {
      return typeof window === 'undefined'
        ? null
        : window.localStorage.getItem(LOCAL_STREAM_KEY);
    } catch (error) {
      console.error('Could not read the local stream URL.', error);
      if (this.isAdminMode) this.adminMessage = 'या ब्राउझरची स्टोरेज सुविधा उपलब्ध नाही.';
      return null;
    }
  }

  private setStreamUrl(value: string) {
    const videoId = getYouTubeVideoId(value);
    this.hasInvalidStreamUrl = Boolean(value.trim()) && !videoId;
    this.streamUrl = videoId
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
        )
      : null;
  }
}
