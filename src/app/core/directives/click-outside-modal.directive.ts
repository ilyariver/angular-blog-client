import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutsideModal]'
})
export class ClickOutsideModalDirective {
  @Output() clickOutsideModal = new EventEmitter();

  constructor(
    private el: ElementRef,
  ) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.el.nativeElement.contains(target);
    const ignoredElement = ['.mat-datepicker-popup', '.mat-mdc-select-panel'];
    const clickedOnIgnoredElement = ignoredElement.some(selector => target.closest(selector));

    if (!clickedInside && !clickedOnIgnoredElement) {
      this.clickOutsideModal.emit();
    }
  }

}
