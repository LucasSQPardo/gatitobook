import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      // Track the changes in value by Observables
      return control.valueChanges.pipe(
        // Function that returns a observable of backend requisition
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        // Since switchMap returns true or false, we use map to turn a error object to use on form validator
        map((usuarioExiste) => (usuarioExiste ? { usuarioExistente: true } : null)),
        // Angular will only place the error in form error object if the Observable is completed
        // That is because, while the user keeps typing, the observable will continue
        // first() will close the observable once the user stops typing
        first()
      );
    }
  }
}
