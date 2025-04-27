import {trigger, transition, animate, style, keyframes, group, sequence} from '@angular/animations';

export const shakeAnimation = trigger('shake', [
  transition('false => true', [
    sequence([
      group([
        animate('500ms', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.1 }),
          style({ transform: 'translateX(10px)', offset: 0.2 }),
          style({ transform: 'translateX(-10px)', offset: 0.3 }),
          style({ transform: 'translateX(10px)', offset: 0.4 }),
          style({ transform: 'translateX(-6px)', offset: 0.5 }),
          style({ transform: 'translateX(6px)', offset: 0.6 }),
          style({ transform: 'translateX(-4px)', offset: 0.7 }),
          style({ transform: 'translateX(4px)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1.0 })
        ])),
        animate('500ms', style({ backgroundColor: 'rgb(255,232,232)' }))
      ]),
      animate('500ms', style({ backgroundColor: 'rgba(255, 0, 0, 0)' })),
    ])
  ])
]);

