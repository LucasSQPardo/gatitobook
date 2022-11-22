import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  retornaToken(): string {
    return localStorage.getItem(KEY) ?? '';
  }

  salvaToken(token: string): void {
    localStorage.setItem(KEY, token)
  }

  excluiToken() {
    localStorage.removeItem(KEY)
  }

  possuiToken() {
    return !!this.retornaToken();
  }
}
