import { inject, Injectable, signal } from "@angular/core";
import { ApiResponse, Constituent, IndexConstituenData } from "../models/constituens.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SelectionService } from "./selection";

@Injectable({
  providedIn: 'root',
})
export class ConstituensData {

  private http = inject(HttpClient);
  private selection = inject(SelectionService);

  constituendsList = signal<IndexConstituenData | null>(null);

  getData(): void {

    this.http.get<ApiResponse>(`assets/resources/constituyentes/constituensList.json`).subscribe({

      next: (res: any) => {
        console.log("respuesta:", res);

        if (!res.success || res.code !== 200) {
          console.error('Ah ocurrido un error!');
          return;
        }

        this.constituendsList.set(res.data);

        const info = res.data.info;
        const defaultRow: Constituent = {
          codeInstrument: info.codeInstrument,
          name: info.name,
          shortName: info.shortName,
          pctDay: 0,
          pct30D: 0,
          pctCY: 0,
          pct1Y: 0,
          lastPrice: 0,
          datetimeLastPrice: '',
          volumeMoney: 0,
          accumulatedVolumeMoney: 0,
          tend: 'same',
          performanceAbsolute: 0,
          performanceRelative: 0,
        };
        this.selection.select(defaultRow);
      }
    });

    // TODO aplicar setTimeout para simular tiempo de respuesta
    setTimeout(() => {
    }, 1000);
  }
}
