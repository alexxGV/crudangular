import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global'
import { Departamento } from '../models/departamento';

@Injectable()
export class DepartamentoService {

    private url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.urldept;
    }

    insertarDepartamento(departamento: Departamento): Observable<any> {
        var request = "/api/departamentos";
        //COMBERTIR DEPARTAMENTO A JSON
        var json = JSON.stringify(departamento);
        console.log(json);

        //PARA ENVIAR INFORMACION AL SERVICIO SE REALIZA POR CABEZERA
        var header = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.post(this.url + request, json, {
            headers: header
        });
    }

    getBuscarDepartamento(iddepartamento: Departamento): Observable<any> {
        var request = "/api/departamentos/" + iddepartamento;
        return this._http.get(this.url + request);
    }

    updateDepartamento(departamento: Departamento): Observable<any> {
        let json = JSON.stringify(departamento);
        var header = new HttpHeaders().set("Content-Type", "application/json");
        var request = "api/departamentos";

        return this._http.put(this.url + request, json, {
            headers: header
        });

    }

    deleteDepartamento(iddepartamento: string): Observable<any> {
        var request = "/api/departamentos/" + iddepartamento;
        return this._http.delete(this.url + request);
    }

    getDepartamentos(): Observable<any> {
        var request = "/api/departamentos";
        return this._http.get(this.url + request);
    }

}