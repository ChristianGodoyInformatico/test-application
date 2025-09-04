import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DetailsService } from '@services/details';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-summary',
  imports: [CommonModule, TabsModule, DividerModule],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  private details = inject(DetailsService);

  resumen = this.details.resumen;
  info = computed(() => this.resumen()?.info);
  price = computed(() => this.resumen()?.price);

  signClass(n: number) {
    return n > 0 ? 'green' : n < 0 ? 'red' : '';
  }
}
