// src/app/services/details.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, of } from 'rxjs';
import { ApiResponse, HistoryData } from '@models/constituens.model';


@Injectable({ providedIn: 'root' })
export class DetailsService {
  private http = inject(HttpClient);

  loading = signal(false);
  error = signal<string | null>(null);
  history = signal<HistoryData | null>(null);
  resumen = signal<any | null>(null);

  /** Ajusta rutas si tus archivos están en otra carpeta */
  private historyUrl = (code: string) =>
    `assets/resources/history/history-${code}.json`;

  private resumenUrl = (code: string) =>
    `assets/resources/resumen/${code}.json`;

  /** Carga ambos en paralelo; si alguno falta, queda en null y muestra aviso */
  loadFor(code: string) {
    this.loading.set(true);
    this.error.set(null);
    forkJoin({
      history: this.http.get<ApiResponse<HistoryData>>(this.historyUrl(code))
        .pipe(catchError(() => of(null))),
      resumen: this.http.get<ApiResponse<any>>(this.resumenUrl(code))
        .pipe(catchError(() => of(null)))
    }).subscribe(({ history, resumen }) => {
      const okH = !!history && history.success && history.code === 200;
      const okR = !!resumen && resumen.success && resumen.code === 200;

      this.history.set(okH ? history!.data : null);
      this.resumen.set(okR ? resumen!.data : null);

      if (!okH && !okR) {
        this.error.set('No hay datos disponibles para el instrumento seleccionado.');
      } else if (!okH) {
        this.error.set('No hay histórico (chart) disponible para el instrumento seleccionado.');
      } else if (!okR) {
        this.error.set('No hay resumen disponible para el instrumento seleccionado.');
      }
      this.loading.set(false);
    }, (e) => {
      this.error.set('Error cargando datos.');
      this.loading.set(false);
    });
  }
}
