import { Observable } from 'rxjs';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Animais } from '../animal';

@Component({
  selector: 'app-grade-fotos-animais',
  templateUrl: './grade-fotos-animais.component.html',
  styleUrls: ['./grade-fotos-animais.component.css']
})
export class GradeFotosAnimaisComponent implements AfterViewInit {
  // ! Metodo com resolver
  @Input() animais!: Animais ;

  // ! Metodo sem resolver
  // @Input() animais$!: Observable<Animais> ;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.animais)
  }

}
