import { CommonModule } from '@angular/common';
import { Component, computed, effect, HostListener, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HistoryPoint } from '@models/constituens.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule, UIChart } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PopoverModule } from 'primeng/popover';
import { DetailsService, SelectionService } from '@services/index';


type Preset = '1M' | '3M' | '6M' | '1A' | '5A' | 'CUSTOM';

@Component({
  selector: 'app-chart',
  imports: [CommonModule, ChartModule, CardModule, MessageModule, FormsModule,
    ButtonModule, SelectButtonModule, PopoverModule, DatePickerModule,],
  templateUrl: './chart.html',
  styleUrl: './chart.scss'
})
export class Chart {
  private selection = inject(SelectionService);
  private details = inject(DetailsService);
  @ViewChild(UIChart) chart?: UIChart;

  presets = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1A', value: '1A' },
    { label: '5A', value: '5A' }
  ];

  selectedPreset: WritableSignal<Preset> = signal<Preset>('6M');
  customRange = signal<Date[] | null>(null);
  loading = computed(() => this.details.loading());
  raw = computed<HistoryPoint[]>(() => {
    const chart = this.details.history()?.chart ?? [];
    return [...chart].sort((a, b) => a.datetimeLastPriceTs - b.datetimeLastPriceTs);
  });
  notFound = computed(() => !this.loading() && !this.raw().length);

  maxDate = computed<Date | undefined>(() =>
    this.raw().length
      ? new Date(Math.max(...this.raw().map((d) => d.datetimeLastPriceTs * 1000)))
      : undefined,
  );

  filtered = computed(() => {
    const data = this.raw();
    if (!data.length) return [];

    if (this.selectedPreset() === 'CUSTOM') {
      const r = this.customRange();
      if (!r || r.length < 2) return data;
      const [s, e] = r;
      return data.filter((d) => {
        const t = d.datetimeLastPriceTs * 1000;
        return t >= s.getTime() && t <= e.getTime();
      });
    }

    const lastMs = Math.max(...data.map(d => d.datetimeLastPriceTs)) * 1000;
    const last = new Date(lastMs);
    const daysMap: Record<Exclude<Preset, 'CUSTOM'>, number> = {
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1A': 365,
      '5A': 1825,
    };
    const days = daysMap[this.selectedPreset() as Exclude<Preset, 'CUSTOM'>];
    const from = new Date(last);
    from.setDate(from.getDate() - days);
    return data.filter((d) => d.datetimeLastPriceTs * 1000 >= from.getTime());
  });

  data = computed(() => {
    const serie = this.filtered();
    return {
      labels: serie.map((p) => new Date(p.datetimeLastPriceTs * 1000).toLocaleDateString()),
      datasets: [
        {
          label: 'Precio',
          data: serie.map((p) => p.lastPrice),
          borderWidth: 2,
          fill: true,
          tension: 0.25,
          pointRadius: 0,
        },
      ]
    };
  });

  options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#cfd3dc' } },
    },
  };

  constructor() {
    effect(() => {
      const code = this.selection.selectedCode();
      if (code) this.details.loadFor(code);
    });
  }

  setPreset(p: Preset) {
    this.selectedPreset.set(p);
    if (p !== 'CUSTOM') this.customRange.set(null);
  }

  onRangeChange(value: Date[] | null, pop?: any) {
    this.customRange.set(value ?? null);
    this.selectedPreset.set('CUSTOM');
    if (value && value.length === 2 && pop) pop.hide(); // cerrar popover al completar rango
  }

  @HostListener('window:resize')
  onResize() {
    this.chart?.refresh();
  }
}
