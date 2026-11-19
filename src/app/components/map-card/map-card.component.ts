import { Component, OnInit, signal } from '@angular/core';
import QRCode from 'qrcode';
import { WEDDING } from '../../config';
import { createMapUrl } from '../../qr-destinations';
/** LEFT card: venue, map QR code, directions and add-to-calendar. */
@Component({
  selector: 'app-map-card', standalone: true,
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss'],
})
export class MapCardComponent implements OnInit {
  w = WEDDING;
  qr = signal('');
  qrError = signal('');
  mapUrl = createMapUrl(WEDDING.mapLink);
  mapHost = this.mapUrl ? new URL(this.mapUrl).hostname : '';
  calUrl = (() => {
    const f = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    const s = new Date(WEDDING.date), e = new Date(s.getTime() + 3 * 3600e3);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${WEDDING.groomEn} & ${WEDDING.brideEn} Wedding`)}&dates=${f(s)}/${f(e)}&location=${encodeURIComponent(WEDDING.venue + ', ' + WEDDING.address)}`;
  })();

  async ngOnInit() {
    if (!this.mapUrl) {
      this.qrError.set('नकाशाची लिंक सुरक्षित Google Maps पत्ता नाही.');
      return;
    }

    try {
      this.qr.set(await QRCode.toDataURL(this.mapUrl, {
        margin: 1,
        width: 300,
        color: { dark: '#7A1020', light: '#FFFFFF' },
      }));
    } catch (error) {
      console.error('Could not generate the venue QR code.', error);
      this.qrError.set('QR कोड तयार होऊ शकला नाही. कृपया नकाशाची लिंक वापरा.');
    }
  }
}
