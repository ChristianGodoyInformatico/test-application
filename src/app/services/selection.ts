import { Injectable, signal, computed } from '@angular/core';
import { Constituent } from '@models/constituens.model';

@Injectable({ providedIn: 'root' })
export class SelectionService {
  selectedRow = signal<Constituent | null>(null);
  selectedCode = computed(() => this.selectedRow()?.codeInstrument ?? null);

  select(row: Constituent) { this.selectedRow.set(row); }
  clear() { this.selectedRow.set(null); }

  isSelected(row: Constituent) {
    return this.selectedCode() === row.codeInstrument;
  }
}
