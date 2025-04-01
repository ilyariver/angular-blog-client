import {InjectionToken} from '@angular/core';
/*
* This way, you can keep the benefits of SSR and prerendering and use the window object.
* */

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if(typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});
