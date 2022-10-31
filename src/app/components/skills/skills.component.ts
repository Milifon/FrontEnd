import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/model/skill';
import { TokenService } from 'src/app/service/token.service';
import { SkillService } from 'src/app/service/skillService.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {
  skill: Skill[] = [];
 
  nombre = "";
  porcentaje: number;
  formData = new FormData(); 
 
  indice: number;
 
   constructor(private skillService: SkillService, private tokenService: TokenService, public modal:NgbModal, private activatedRouter: ActivatedRoute, private httpClient: HttpClient) { }
 
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
       for (i = 0; i < this.skill.length; i++) {
         if(this.skill[i].id == id){
           this.indice = i;
         }
       } 
     
   }
 
   id: number = 0;
   cargar(): void{
     this.skillService.lista().subscribe(
       data => {this.skill = data;}
     )
   }
 
   delete(): void{
     
       if(this.indice > -1){
         this.skillService.delete(this.skill[this.indice].id).subscribe(
           data => {
             this.cargar();
           }
         )
       }
    
   }
     
   skillEditar: Skill = null;
   skillNueva: Skill = null;
 
   onUpdate(): void{
       this.skillEditar = this.skill[this.indice];
       this.formData.append("skillEditar", JSON.stringify(this.skillEditar));
       this.skillService.update( this.skill[this.indice].id, this.formData).subscribe(data => {
           this.cargar();
       });
     
   }
 
   create(): void {
       const skillNueva = new Skill(this.nombre, this.porcentaje)
     this.formData.append("skillNueva", JSON.stringify(skillNueva));
       this.skillService.save(this.formData).subscribe(data => {
           this.cargar();
       });
    
   }
 
   onFileSelected(event:any){
     const file:File = event.target.files[0];
  
     this.formData.append("fichero", file);
   }
 }
 
