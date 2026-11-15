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
    const now = new Date();
    if (this.target <= now.getTime()) { this.over.set(true); return; }

    const addMonths = (date: Date, count: number) => {
      const result = new Date(date);
      const day = result.getDate();
      result.setDate(1);
      result.setMonth(result.getMonth() + count);
      const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
      result.setDate(Math.min(day, lastDay));
      return result;
    };

    const weddingDate = new Date(this.target);
    let months = Math.max(
      0,
      (weddingDate.getFullYear() - now.getFullYear()) * 12
        + weddingDate.getMonth() - now.getMonth(),
    );
    while (months > 0 && addMonths(now, months).getTime() > this.target) months--;
    while (addMonths(now, months + 1).getTime() <= this.target) months++;

    const remaining = this.target - addMonths(now, months).getTime();
    const s = Math.floor(remaining / 1000), p = (n: number) => String(n).padStart(2, '0');
    const tiles = [
      ...(months ? [{ v: String(months), l: months === 1 ? 'महिना' : 'महिने' }] : []),
      { v: String(Math.floor(s / 86400)), l: 'दिवस' },
      { v: p(Math.floor(s / 3600) % 24), l: 'तास' },
      { v: p(Math.floor(s / 60) % 60), l: 'मिनिटे' },
      { v: p(s % 60), l: 'सेकंद' },
    ];
    this.tiles.set(tiles);
  }
}
