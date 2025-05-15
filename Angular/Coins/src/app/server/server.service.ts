// src/app/coins.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs';
export interface CoinData {
  coin: string;
  date: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
private apiBase = 'https://localhost:7205/api/coins';
  constructor(private http: HttpClient) {}

getCoinsRange(coinName: string, range: string): Observable<CoinData[]> {
  let endpoint = '';
  switch (range) {
    case 'שבוע': endpoint = 'week'; break;
    case 'חודש': endpoint = 'month'; break;
    case 'חצי שנה': endpoint = 'halfyear'; break;
    case 'שנה': endpoint = 'year'; break;
    default: endpoint = 'week';
  }

  return this.http.get<CoinData[]>(`${this.apiBase}/${endpoint}/${coinName}`).pipe(
    catchError((err) => {
      console.error('שגיאה בשרת:', err);
      return throwError(() => err);
    })
  );
}
}