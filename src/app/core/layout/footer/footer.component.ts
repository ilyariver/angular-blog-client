import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

}
