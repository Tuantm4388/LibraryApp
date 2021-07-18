import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-lib-text-input',
  templateUrl: './lib-text-input.component.html',
  styleUrls: ['./lib-text-input.component.css']
})
export class LibTextInputComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() type = 'text';
  inputbox = 'value';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

}
