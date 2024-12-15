import { Component, Input } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: []
})
export class OwnerComponent {
  @Input()
  owner: User | null = null;
}
