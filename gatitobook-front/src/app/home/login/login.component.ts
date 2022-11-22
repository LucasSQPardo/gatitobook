import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = '';
  senha = '';
  constructor(private service: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(`usuario:${this.usuario}`)
    console.log(`senha:${this.senha}`)
    this.service.autenticar(this.usuario, this.senha).subscribe(()=>{
     this.router.navigate(['animais'])
    }),
    (error: any) =>{
      console.log(error)
    }
  }

}
