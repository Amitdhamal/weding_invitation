import { Component, Input } from '@angular/core';
/** Auspicious symbols: Swastik (with four dots) or Om. Size = parent's font-size. */
@Component({
  selector: 'app-sacred', standalone: true,
  templateUrl: './sacred.component.html',
  styleUrls: ['./sacred.component.scss'],
})
export class SacredComponent { @Input() kind: 'om' | 'swastik' = 'swastik'; }
