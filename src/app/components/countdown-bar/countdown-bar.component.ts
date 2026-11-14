import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { WEDDING } from '../../config';
@Component({
  selector: 'app-countdown-bar', standalone: true,
  templateUrl: './countdown-bar.component.html',
  styleUrls: ['./countdown-bar.component.scss'],
})
export class CountdownBarComponent implements OnInit, OnDestroy {
  tiles = signal<{ v: string; l: string }[]>([]); over = signal(false);
  private timer?: any; private target = new Date(WEDDING.date).getTime();
  ngOnInit() { this.tick(); this.timer = setInterval(() => this.tick(), 1000); }
  ngOnDestroy() { clearInterval(this.timer); }
  private tick() {
    const ms = this.target - Date.now(); if (ms <= 0) { this.over.set(true); return; }
    const s = Math.floor(ms / 1000), p = (n: number) => String(n).padStart(2, '0');
    this.tiles.set([{ v: String(Math.floor(s / 86400)), l: 'दिवस' }, { v: p(Math.floor(s / 3600) % 24), l: 'तास' }, { v: p(Math.floor(s / 60) % 60), l: 'मिनिटे' }, { v: p(s % 60), l: 'सेकंद' }]);
  }
}
