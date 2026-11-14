import { Component } from '@angular/core';
import { SacredComponent } from '../sacred/sacred.component';
@Component({
  selector: 'app-section-title', standalone: true, imports: [SacredComponent],
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
})
export class SectionTitleComponent {}
