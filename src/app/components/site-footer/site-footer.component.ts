import { Component } from '@angular/core';
import { WEDDING } from '../../config';
import { SacredComponent } from '../sacred/sacred.component';
@Component({
  selector: 'app-site-footer', standalone: true, imports: [SacredComponent],
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
})
export class SiteFooterComponent { w = WEDDING; }
