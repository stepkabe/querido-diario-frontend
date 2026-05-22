import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EnvService } from 'src/app/env.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  getAllObservableCache: Observable<any> | null = null;
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private env: EnvService) {}

  getAll(): Observable<any> {
    if (!this.getAllObservableCache)
      this.getAllObservableCache = this.http.get(`${this.env.apiUrl}/cities?levels=3`).pipe(
        map((data) => {
          return data;
        }),
        shareReplay(1),
        catchError((error) => {
          console.error(error);
          this.snackBar.open(
            'Houve um erro buscando as cidades disponíveis! Tente novamente mais tarde.',
            'Fechar'
          );
          return of({ cities: [] });
        })
      );

    return this.getAllObservableCache;
  }
}
