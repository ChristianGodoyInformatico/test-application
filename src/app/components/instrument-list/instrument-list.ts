import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Constituent } from '@models/constituens.model';
import { ConstituensData } from '@services/constituensData';
import { TableModule } from 'primeng/table';
import { PrefixValueDirective } from '../../directives/prefix-value.directive';
import { SelectionService } from '@services/selection';

@Component({
  selector: 'app-instrument-list',
  imports: [CommonModule, DecimalPipe, TableModule, PrefixValueDirective],
  templateUrl: './instrument-list.html',
  styleUrl: './instrument-list.scss'
})
export class InstrumentList {
  private svc = inject(ConstituensData);

  loading = signal(true);
  query = signal('');
  sortField = signal<keyof Constituent>('shortName');
  sortOrder = signal<1 | -1>(1);

  // lista maestra
  rows = signal<Constituent[]>([]);

  constructor(private sel: SelectionService) {
    // cuando llega el JSON → guardamos la lista
    effect(() => {
      const payload = this.svc.constituendsList();
      if (payload) {
        this.rows.set(payload.constituents ?? []);
        this.loading.set(false);
      }
    });
  }

  selectRow(r: Constituent) { this.sel.select(r); }
  isSelected(r: Constituent) { return this.sel.isSelected(r); }

  ngOnInit() {
    this.svc.getData();
  }

  // filtrar + ordenar una sola vez para ambas tablas
  filteredSorted = computed(() => {
    const q = this.query().trim().toLowerCase();
    const field = this.sortField();
    const order = this.sortOrder();

    const filtered = this.rows().filter(r =>
      !q ||
      r.shortName.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q)
    );

    return [...filtered].sort((a, b) => {
      const va = (a as any)[field];
      const vb = (b as any)[field];
      if (va == null && vb == null) return 0;
      if (va == null) return -1 * order;
      if (vb == null) return 1 * order;
      return (va < vb ? -1 : va > vb ? 1 : 0) * order;
    });
  });

  // split visible
  left = computed(() => this.filteredSorted().slice(0, Math.ceil(this.filteredSorted().length / 2)));
  right = computed(() => this.filteredSorted().slice(Math.ceil(this.filteredSorted().length / 2)));

  onSort(e: { field: keyof Constituent; order: 1 | -1 }) {
    this.sortField.set(e.field);
    this.sortOrder.set(e.order);
  }

  toMM(amount: number): number { return amount / 1_000_000; }
  sign(n: number) { return n > 0 ? '+' : ''; }
}
