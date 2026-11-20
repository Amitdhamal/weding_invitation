import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app-root/app.component';

const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
if (navigation?.type === 'reload') {
  history.scrollRestoration = 'manual';
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}

bootstrapApplication(AppComponent).catch(console.error);
