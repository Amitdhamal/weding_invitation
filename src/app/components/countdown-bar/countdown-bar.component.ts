import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { WEDDING } from '../../config';
import { CommonService } from '../../../shared/services/common.service';

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

@Component({
  selector: 'app-countdown-bar', standalone: true,
  templateUrl: './countdown-bar.component.html',
  styleUrls: ['./countdown-bar.component.scss'],
})
export class CountdownBarComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private commonService: CommonService) {}
  @ViewChild('celebrationCanvas') celebrationCanvas?: ElementRef<HTMLCanvasElement>;

  tiles = signal<{ v: string; l: string }[]>([]); over = signal(false);
  private timer?: any; private target = new Date(WEDDING.date).getTime();
  private fireworksFrame?: number;
  private celebrationStarted = false;
  private rockets: Rocket[] = [];
  private sparks: Spark[] = [];
  private width = 0;
  private height = 0;
  private lastLaunch = 0;

  ngOnInit() { this.tick(); this.timer = setInterval(() => this.tick(), 1000); }
  ngAfterViewInit() {
    if (this.over()) this.startCelebration();
    this.commonService.sendMarriageOver(this.over());
  }
  ngOnDestroy() {
    clearInterval(this.timer);
    if (this.fireworksFrame) cancelAnimationFrame(this.fireworksFrame);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.celebrationStarted) this.resizeCanvas();
  }

  private tick() {
    const now = new Date();
    if (this.target <= now.getTime()) {
      if (!this.over()) {
        this.over.set(true);
        this.commonService.sendMarriageOver(true);
        this.startCelebration();
      }
      return;
    }

    const addMonths = (date: Date, count: number) => {
      const result = new Date(date);
      let day = result.getDate();
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
    const days = Math.floor(s / 86400);
    const hours = Math.floor(s / 3600) % 24;
    const minutes = Math.floor(s / 60) % 60;
    const tiles = [
      ...(months ? [{ v: String(months), l: months === 1 ? 'महिना' : 'महिने' }] : []),
      { v: String(days), l: 'दिवस' },
      { v: p(hours), l: 'तास' },
      { v: p(minutes), l: 'मिनिटे' },
      { v: p(s % 60), l: 'सेकंद' },
    ];
    this.tiles.set(tiles);
  }

  private startCelebration() {
    if (this.celebrationStarted) return;
    this.celebrationStarted = true;
    queueMicrotask(() => {
      this.resizeCanvas();
      this.launchRocket();
      this.launchRocket();
      this.fireworksFrame = requestAnimationFrame((time) => this.animateFireworks(time));
    });
  }

  private resizeCanvas() {
    const canvas = this.celebrationCanvas?.nativeElement;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = Math.round(this.width * dpr);
    canvas.height = Math.round(this.height * dpr);
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;
    const context = canvas.getContext('2d');
    context?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private launchRocket() {
    const colors = ['#FFD27A', '#FF5B6E', '#FF89C0', '#72DDF7', '#B5E48C', '#FFFFFF'];
    const x = 80 + Math.random() * Math.max(1, this.width - 160);
    this.rockets.push({
      x,
      y: this.height + 12,
      targetY: 70 + Math.random() * Math.max(80, this.height * 0.45),
      vx: (Math.random() - 0.5) * 1.2,
      vy: -(7.5 + Math.random() * 2.5),
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  private explode(rocket: Rocket) {
    const count = this.width < 600 ? 38 : 58;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.12;
      const speed = 2.2 + Math.random() * 4.2;
      this.sparks.push({
        x: rocket.x,
        y: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 50 + Math.random() * 35,
        color: rocket.color,
        size: 1.5 + Math.random() * 1.8,
      });
    }
  }

  private animateFireworks(time: number) {
    const canvas = this.celebrationCanvas?.nativeElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, this.width, this.height);

    if (time - this.lastLaunch > 520) {
      this.launchRocket();
      if (Math.random() > 0.45) this.launchRocket();
      this.lastLaunch = time;
    }

    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const rocket = this.rockets[i];
      rocket.x += rocket.vx;
      rocket.y += rocket.vy;
      rocket.vy += 0.075;

      context.globalAlpha = 1;
      context.fillStyle = rocket.color;
      context.beginPath();
      context.arc(rocket.x, rocket.y, 2.2, 0, Math.PI * 2);
      context.fill();

      if (rocket.y <= rocket.targetY || rocket.vy >= -1) {
        this.explode(rocket);
        this.rockets.splice(i, 1);
      }
    }

    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const spark = this.sparks[i];
      spark.life++;
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vx *= 0.985;
      spark.vy = spark.vy * 0.985 + 0.055;

      context.globalAlpha = Math.max(0, 1 - spark.life / spark.maxLife);
      context.fillStyle = spark.color;
      context.beginPath();
      context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      context.fill();

      if (spark.life >= spark.maxLife) this.sparks.splice(i, 1);
    }
    context.globalAlpha = 1;

    this.fireworksFrame = requestAnimationFrame((nextTime) => this.animateFireworks(nextTime));
  }
}
