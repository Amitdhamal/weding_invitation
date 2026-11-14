import { Component, OnInit, signal } from '@angular/core';
import QRCode from 'qrcode';
import { WEDDING } from '../../config';
/** RIGHT card: RSVP (upasthiti) steps, WhatsApp QR code and share. */
@Component({
  selector: 'app-rsvp-card', standalone: true,
  templateUrl: './rsvp-card.component.html',
  styleUrls: ['./rsvp-card.component.scss'],
})
export class RsvpCardComponent implements OnInit {
  qr = signal('');
  private readonly rsvpMessage = 'नमस्कार! पत्रिका मिळाली...आम्ही लग्नाला नक्की येऊ....!!';
  rsvpUrl = `https://wa.me/${WEDDING.rsvpWhatsApp}?${new URLSearchParams({ text: this.rsvpMessage })}`;
  async ngOnInit() { this.qr.set(await QRCode.toDataURL(this.rsvpUrl, { margin: 1, width: 220, color: { dark: '#7A1020', light: '#FFFFFF' } })); }
  share() {
    const d = { title: 'शुभ विवाह', text: `${WEDDING.groomEn} & ${WEDDING.brideEn} यांच्या लग्नाचे आमंत्रण`, url: location.href };
    navigator.share ? navigator.share(d) : navigator.clipboard.writeText(location.href);
  }
}
