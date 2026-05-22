import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/env.service';
import { Suggestion } from 'src/app/interfaces/suggestion';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(private http: HttpClient, private env: EnvService) {}

  save(data: Suggestion): Observable<any> {
    return this.http.post(`${this.env.apiUrl}/suggestions`, data)
  }
}
