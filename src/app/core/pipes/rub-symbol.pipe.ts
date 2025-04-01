import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Pipe({
  name: 'rubSymbol',
  standalone: true,
})
export class RubSymbolPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): unknown {
    const currencyPipe = new CurrencyPipe('ru-RU');
    return currencyPipe.transform(value, 'RUB', 'symbol-narrow', '.0');
  }

}
