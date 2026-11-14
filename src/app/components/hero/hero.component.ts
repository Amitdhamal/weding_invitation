import { Component } from '@angular/core';
import { WEDDING } from '../../config';
import { SacredComponent } from '../sacred/sacred.component';
import { FeatherComponent } from '../feather/feather.component';
@Component({
  selector: 'app-hero', standalone: true, imports: [SacredComponent, FeatherComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  w = WEDDING;
  dateLabel = new Date(WEDDING.date).toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
