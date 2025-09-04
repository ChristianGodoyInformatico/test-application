import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DetailsService } from '@services/details';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-header',
  imports: [CommonModule, DividerModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private details = inject(DetailsService);

  resumen = this.details.resumen;
  info = computed(() => this.resumen()?.info);
  price = computed(() => this.resumen()?.price);

  signClass(n: number) {
    return n > 0 ? 'green' : n < 0 ? 'red' : '';
  }
}
