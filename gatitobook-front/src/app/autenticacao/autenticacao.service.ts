import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService) { }

  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient.post('http://localhost:3000/user/login', {
      userName: usuario,
      password: senha
    },
      { observe: 'response' } // ? para observar o header tb
    ).pipe( // usado pq queremos fazer uma operação
      tap((res) => { // ? tap é usado quando não queremos alterar o fluxo nem o resultado
        const authToken = res.headers.get('x-access-token') ?? ''; // ? só queremos guardar a informação, sem modifica-la
        this.usuarioService.salvaToken(authToken);
      })
    )
  }
}
