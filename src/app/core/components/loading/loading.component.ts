import {Component, inject} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoadingComponent {

  loadingService = inject(LoadingService);

}
