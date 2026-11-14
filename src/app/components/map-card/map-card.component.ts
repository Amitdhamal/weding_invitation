import { Component, OnInit, signal } from '@angular/core';
import QRCode from 'qrcode';
import { WEDDING } from '../../config';
/** LEFT card: venue, map QR code, directions and add-to-calendar. */
@Component({
  selector: 'app-map-card', standalone: true,
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss'],
})
export class MapCardComponent implements OnInit {
  w = WEDDING; qr = signal('');
  calUrl = (() => {
    const f = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    const s = new Date(WEDDING.date), e = new Date(s.getTime() + 3 * 3600e3);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${WEDDING.groomEn} & ${WEDDING.brideEn} Wedding`)}&dates=${f(s)}/${f(e)}&location=${encodeURIComponent(WEDDING.venue + ', ' + WEDDING.address)}`;
  })();
  async ngOnInit() { this.qr.set(await QRCode.toDataURL(WEDDING.mapLink, { margin: 1, width: 220, color: { dark: '#7A1020', light: '#FFFFFF' } })); }
}
