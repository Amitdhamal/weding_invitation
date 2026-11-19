import { Component, OnInit, signal } from '@angular/core';
import QRCode from 'qrcode';
import { WEDDING } from '../../config';
import { createRsvpUrl } from '../../qr-destinations';
/** RIGHT card: RSVP (upasthiti) steps, WhatsApp QR code and share. */
@Component({
  selector: 'app-rsvp-card', standalone: true,
  templateUrl: './rsvp-card.component.html',
  styleUrls: ['./rsvp-card.component.scss'],
})
export class RsvpCardComponent implements OnInit {
  qr = signal('');
  qrError = signal('');
  private readonly rsvpMessage = 'नमस्कार! पत्रिका मिळाली...आम्ही लग्नाला नक्की येऊ....!!';
  rsvpUrl = createRsvpUrl(WEDDING.rsvpWhatsApp, this.rsvpMessage);

  async ngOnInit() {
    if (!this.rsvpUrl) {
      this.qrError.set('WhatsApp क्रमांक चुकीचा आहे. कृपया आयोजकांशी संपर्क साधा.');
      return;
    }

    try {
      this.qr.set(await QRCode.toDataURL(this.rsvpUrl, {
        margin: 1,
        width: 220,
        color: { dark: '#7A1020', light: '#FFFFFF' },
      }));
    } catch (error) {
      console.error('Could not generate the RSVP QR code.', error);
      this.qrError.set('QR कोड तयार होऊ शकला नाही. कृपया WhatsApp बटण वापरा.');
    }
  }

  share() {
    const d = { title: 'शुभ विवाह', text: `${WEDDING.groomEn} & ${WEDDING.brideEn} यांच्या लग्नाचे आमंत्रण`, url: location.href };
    navigator.share ? navigator.share(d) : navigator.clipboard.writeText(location.href);
  }
}
