import { Component, OnDestroy } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { Subscription } from 'rxjs';
/** Falling rose petals (gulab pakalya). Keyframes live in styles.scss. */
@Component({
  selector: 'app-petals', standalone: true,
  templateUrl: './petals.component.html',
  styleUrls: ['./petals.component.scss'],
})
export class PetalsComponent implements OnDestroy {
  isMarriageOver = false;
  private marriageOverSubscription: Subscription;

  constructor(private commonService: CommonService) {
    this.marriageOverSubscription = this.commonService.marriageOver.subscribe((value:any) => {
      this.isMarriageOver = value;
    });
  }

  ngOnDestroy() {
    this.marriageOverSubscription.unsubscribe();
  }

  petals = Array.from({ length: 12 }, (_, i) => ({ left: (i * 37 + 5) % 96, delay: (i * 1.9) % 12, dur: 11 + (i % 5) * 2.5, size: 14 + (i % 4) * 7, v: i % 3 }));
}
