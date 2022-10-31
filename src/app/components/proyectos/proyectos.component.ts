import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { TokenService } from 'src/app/service/token.service';
import { ProyectoService } from 'src/app/service/proyectoService.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  proy: Proyecto[] = [];
 
  nombre = "";
  descripcion: "";
  fecha: "";
  link = "";
  formData = new FormData(); 
 
  indice: number;
 
   constructor(private proyectoService: ProyectoService, private tokenService: TokenService, public modal:NgbModal, private activatedRouter: ActivatedRoute, private httpClient: HttpClient) { }
 
   isLogged = false;
 
   ngOnInit(): void {
     this.cargar();
     if(this.tokenService.getToken()){
       this.isLogged = true;
     } else {
       this.isLogged = false;
     }
       
   }
 
   imprimirIndice(id: number): void {
     var i;
       for (i = 0; i < this.proy.length; i++) {
         if(this.proy[i].id == id){
           this.indice = i;
         }
       } 
     
   }
 
   id: number = 0;
   cargar(): void{
     this.proyectoService.lista().subscribe(
       data => {this.proy = data;}
     )
   }
 
   delete(): void{
     
       if(this.indice > -1){
         this.proyectoService.delete(this.proy[this.indice].id).subscribe(
           data => {
             this.cargar();
           }
         )
       }
    
   }
     
   proyEditar: Proyecto = null;
   proyNueva: Proyecto = null;
 
   onUpdate(): void{
       this.proyEditar = this.proy[this.indice];
       this.formData.append("proyEditar", JSON.stringify(this.proyEditar));
       this.proyectoService.update( this.proy[this.indice].id, this.formData).subscribe(data => {
           this.cargar();
       });
     
   }
 
   create(): void {
       const proyNueva = new Proyecto(this.nombre, this.descripcion, this.fecha, this.link)
     this.formData.append("proyNueva", JSON.stringify(proyNueva));
       this.proyectoService.save(this.formData).subscribe(data => {
           this.cargar();
       });
    
   }
 
   onFileSelected(event:any){
     const file:File = event.target.files[0];
  
     this.formData.append("fichero", file);
   }
 }
 
