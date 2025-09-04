import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Constituent } from '@models/constituens.model';
import { SelectionService } from '@services/selection';
import { PrefixValueDirective } from '../../directives/prefix-value.directive';

@Component({
  selector: 'app-instrument-item',
  imports: [CommonModule, DecimalPipe, PrefixValueDirective],
  templateUrl: './instrument-item.html',
  styleUrl: './instrument-item.scss'
})
export class InstrumentItem {
  @Input() instrument!: Constituent;

  private selection = inject(SelectionService);

  selectRow() {
    this.selection.select(this.instrument);
  }

  isSelected() {
    return this.selection.isSelected(this.instrument);
  }

  toMM(amount: number): number {
    return amount / 1_000_000;
  }

  sign(n: number) {
    return n > 0 ? '+' : '';
  }
}
