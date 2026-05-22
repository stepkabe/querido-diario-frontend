import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  public envFileLoaded = false

  // URL base da API — sobrescrita em runtime via env.js (window.__env.apiUrl)
  public apiUrl = 'https://api.queridodiario.ok.org.br'

  // Max size of Querido Diário API results (THEMED_EXCERPT_FRAGMENT_SIZE)
  public qdApiSearchResultMaxSize = 10000

  constructor() { }
}
