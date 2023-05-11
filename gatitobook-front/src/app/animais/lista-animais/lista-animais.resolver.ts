import { switchMap, take } from 'rxjs/operators';
import { Animais } from './../animal';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// ! intuito: carregar uma informação antes da rota ser resolvida,
// ? neste caso, a rota da lista de animais será carregada antes que o componente termine de renderizar
// ? logo, o componente  faz a busca na api enquanto o componente é renderizado
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(private animaisService: AnimaisService, private usuarioService: UsuarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {
    this.animaisService.buscaPorId
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      }),
      take(1) // ele finaliza o fluxo depois de fazer uma vez
    );
  }
}
