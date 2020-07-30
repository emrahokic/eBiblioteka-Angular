import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

// @ts-ignore
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }
}
