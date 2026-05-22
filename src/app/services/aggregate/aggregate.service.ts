import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AggregateQuery, ResponseAggregate } from 'src/app/interfaces/aggregate';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class AggregateService {
  constructor(private http: HttpClient, private env: EnvService) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning a default result.
      return of(result as T);
    };
  }

  findAll(query: AggregateQuery): Observable<ResponseAggregate> {
    const { territory_id, state_code } = query;
    let queryParams: any = {};

    let url: string;

    if (!territory_id) {
      queryParams = { state_code: state_code };
      url = this.env.apiUrl + `/aggregates/${state_code}`;
    } else {
      queryParams = { territory_id: territory_id };
      const encodedQueryString = new URLSearchParams(queryParams).toString();
      url = this.env.apiUrl + `/aggregates/${state_code}?${encodedQueryString}`;
    }

    return this.http.get<ResponseAggregate>(url).pipe(
      map((res: ResponseAggregate) => {
        return res;
      }),
      catchError(
        this.handleError<ResponseAggregate>({
          state_code: '',
          territory_id: '',
          aggregates: [],
        })
      )
    );
  }
}
