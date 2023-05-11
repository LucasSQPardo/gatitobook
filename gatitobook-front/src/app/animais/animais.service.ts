import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mapTo, Observable, of, throwError } from 'rxjs';
import { Animais, Animal } from './animal';

const API = environment.apiURL
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    const url: string = `${API}/${nomeDoUsuario}/photos`;
    // console.log(url)
    // ! não é mais utilizado pois formamos o header pelo interceptor
    // const token = this.tokenService.retornaToken();
    // const headers = new HttpHeaders().append('x-access-token', token);
    // return this.http.get<Animais>(url, {
    //   headers,       // ? não é preciso passar headers = headers, pois nesse caso a constante tem o mesmo nome do atributo da options

    // })
    return this.http.get<Animais>(url)
  }

  buscaPorId(id: number): Observable<Animal> {
    // ! não é mais utilizado pois adicionamos o header pelo interceptor
    // const token = this.tokenService.retornaToken();
    // const headers = new HttpHeaders().append('x-access-token', token);
    // return this.http.get<Animal>(`${API}/photos/${id}`, { headers });
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-access-token', token);
    return this.http.get<Animal>(`${API}/photos/${id}`, { headers });
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`)
  }

  curtir(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${API}/photos/${id}/like`,
      {},
      { observe: 'response' }
    ).pipe(
      map(() => true),
      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(() => new Error(error))
      })
    )
  }

  upload(descricao:string, permiteComentario: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.http.post(`${API}/photos/upload`, formData, {
      observe:'events',
      reportProgress: true,
    })
  }
}
