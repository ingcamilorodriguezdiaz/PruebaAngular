import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './servicios/usuario.service';
import { Util } from './utils/util';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  usuario = {
    IdUsuario: "",
    LlaveAutorizado: "",
    Nombre: "",
    PrimerApellido: "",
    SegundoApellido: "",
  }
  constructor(public usuarioService: UsuarioService){

  }

  ngOnInit(): void {
    const data= {id:'henry.agudelo@frutasyhortalizas.com.co',password:'202018'};

    this.usuarioService.post("https://localhost:44387/WSAsohofrucol.asmx/Auth",data).subscribe((data:any)=>{
      const parser = new xml2js.Parser();
      parser.parseString(data, (err:any, result:any) => {
        this.usuario = JSON.parse(result.string._);        
      });
    });
  }

}
