import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { from } from 'rxjs';
import { Departamento } from './../../models/departamento';
import { DepartamentoService } from './../../services/departamento.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  public departamento: Departamento;

  @ViewChild("cajanumero") cajanumero: ElementRef;
  @ViewChild("cajanombre") cajanombre: ElementRef;
  @ViewChild("cajalocalidad") cajalocalidad: ElementRef;


  constructor(
    private _servicio: DepartamentoService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) { }

  buscarDepartamento(iddempt) {
    this._servicio.getBuscarDepartamento(iddempt).subscribe(response => {
      this.departamento = response;
    })
  }

  updateDepartamento() {
    var num = parseInt(this.cajanumero.nativeElement.value);
    var nom = this.cajanombre.nativeElement.value;
    var loc = this.cajalocalidad.nativeElement.value;

    var dept = new Departamento(num, nom, loc);

    this._servicio.updateDepartamento(dept).subscribe(response => {
      this._router.navigate(["/"]);
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      this.buscarDepartamento(params.iddepartamento)
    });
  }

}
