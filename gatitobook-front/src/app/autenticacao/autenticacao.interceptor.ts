import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornaToken()
      const headers = new HttpHeaders().append('x-access-token', token);
      request = request.clone( { headers} ) // ? no Http interceptor não é possivel mudaro objeto, logo, fazemos um clone do  request para adicionar o header
    }
    // ? é utilizado o next handle pq podemos ter varios interceptors que modificam (clonando e adicionando) o request ao inves de um só
    return next.handle(request);
    // ! para utiliza-lo basta adicionarmos no provider do modulo desejado;
  }
}
