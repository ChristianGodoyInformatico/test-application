import { inject, Injectable, signal } from "@angular/core";
import { ApiResponse, IndexConstituenData } from "../models/constituens.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ConstituensData {

  private http = inject(HttpClient);

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
      }
    });

    // TODO aplicar setTimeout para simular tiempo de respuesta
    setTimeout(() => {
    }, 1000);
  }
}
