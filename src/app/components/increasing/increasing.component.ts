import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styleUrls: ['./increasing.component.scss'],
})
export class IncreasingComponent {
  @Input() progress: number = 50;
  @Input() typeButton: string = '';
  @Output() value: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    let total = this.progress + value;
    if (total >= 100) total = 100;
    if (total <= 0) total = 0;
    this.progress = total;
    this.value.emit(this.progress);
  }

  onChange(value: number) {
    if (value >= 100) this.progress = 100;
    if (value <= 0) this.progress = 0;
    this.progress = value;
    this.value.emit(this.progress);
  }
}
