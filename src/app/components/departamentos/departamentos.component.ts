import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from './../../services/departamento.service';
import { Departamento } from './../../models/departamento';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  public departamentos: Array<Departamento>;

  constructor(private _service: DepartamentoService,
    private _activatedRoute: ActivatedRoute) {
    this.departamentos = [];
  }

  eliminarDepartamento(id) {
    this._service.deleteDepartamento(id).subscribe(response => {
      this.cargarDepartamentos();
    })
  }

  cargarDepartamentos() {
    this._service.getDepartamentos().subscribe(response => {
      this.departamentos = response;
    });
  }

  ngOnInit(): void {
    //RECIBIMOS UN PARAMETRO O NO...
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params.iddepartamento != null) {
        //ELIMINAR
        console.log(params.iddepartamento);

        this.eliminarDepartamento(params.iddepartamento);
      } else {
        this.cargarDepartamentos();
      }
    });
  }

}
