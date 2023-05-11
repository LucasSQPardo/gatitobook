import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { NovoUsuario } from './novo-usuario';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo.validator';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      fullName: ['', [
        Validators.required, Validators.minLength(4)
      ]],
      userName: ['',
        [minusculoValidator],  //Synchronous validation
        [this.usuarioExisteService.usuarioJaExiste()], //Asynchronous validation
      ],
      password: [''],

      listaUsuarios: this.formBuilder.array
    },
    {
      validators: [usuarioSenhaIguaisValidator]
    });
  }

  cadastrar(): any {
    if(this.novoUsuarioForm.valid){
      const novoUsuario: NovoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.service.cadastraNovoUsuario(novoUsuario).subscribe(()=>{this.router.navigate([''])},
      (error)=>{
        console.log(error)
      });

      console.log(novoUsuario)
    }
  }

}
