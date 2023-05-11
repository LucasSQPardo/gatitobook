import { AutenticacaoInterceptor } from './autenticacao.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true, // ! por padrão o angular identifica que é utilizado apenas um interceptor, logo, precisamos declarar que queremos/podemos utilizar varios interceptors para consituir a requisição
    }
  ]
})
export class AutenticacaoModule { }
