import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperacionService } from './operacion-service';
import { Usuario } from '../modelo/usuario';


@Injectable()
export class UsuarioService extends OperacionService {
  usuarios$ = new BehaviorSubject<Usuario[]>([]);
  constructor(public override http: HttpClient) {
    super(http);
  }

  add$(empleados: Usuario[]) {
    this.usuarios$.next(empleados);
  }

  get$(): Observable<Usuario[]> {
    return this.usuarios$.asObservable();
  }
}
