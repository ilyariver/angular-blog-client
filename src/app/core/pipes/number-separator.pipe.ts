import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'numSeparator'
})
export class NumberSeparatorPipe implements PipeTransform {

  transform(value: number): string {
    if (value === undefined) {
      return '';
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
