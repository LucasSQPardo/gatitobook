import { ActivatedRoute } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Animais } from '../animal';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {
  // ! Metodo com resolver
  animais!: Animais;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.animais = this.activatedRoute.snapshot.data['animais'] as Animais;
    })

  }

  // ! Metodo sem resolver
  // animais$!: Observable<Animais>;

  // constructor(
  //   private usuarioService: UsuarioService,
  //   private animaisService: AnimaisService,
  // ) { }

  // ngOnInit(): void {
  //   this.animais = this.usuarioService.retornaUsuario().pipe(
  //     switchMap((usuario) => {
  //       const username = usuario.name ?? '';
  //       console.log(username)
  //       return this.animaisService.listaDoUsuario(username);
  //     })
  //   )
  // }


}
