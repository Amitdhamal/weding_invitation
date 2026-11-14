import { Component } from '@angular/core';
import { WEDDING } from '../../config';
import { SacredComponent } from '../sacred/sacred.component';
import { FeatherComponent } from '../feather/feather.component';
@Component({
  selector: 'app-invitation-note', standalone: true, imports: [SacredComponent, FeatherComponent],
  templateUrl: './invitation-note.component.html',
  styleUrls: ['./invitation-note.component.scss'],
})
export class InvitationNoteComponent { w = WEDDING; }
