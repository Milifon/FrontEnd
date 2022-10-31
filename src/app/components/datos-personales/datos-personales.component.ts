import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  nombre = new FormControl('');
  puesto = new FormControl('');
  descripcion = new FormControl('');
  formData = new FormData(); 
  
  persona: Persona = new Persona(1, this.nombre.value, this.descripcion.value, this.puesto.value, "");

  isLogged = false;

  constructor(public personaService: PersonaService, private tokenService: TokenService, public modal:NgbModal,  private router: Router, private activatedRouter: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {this.persona = data})
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut():void {
    this.tokenService.logOut();
    window.location.reload();
  }

  enviarFormulario(){
   
    this.formData.append("persona", JSON.stringify(this.persona));
 
    //Realizamos la petición a SpringBoot

    this.personaService.update(1, this.formData).subscribe(data => {
   // this.httpClient.put<any>('http://localhost:4200/personas/editar/1', this.formData).subscribe(data => {
        //En este punto nuestra petición ha funcionado correctamente
        window.location.reload()
    });
 
   /* this.personaService.update(1, this.formData).subscribe(data => {
        //En este punto nuestra petición ha funcionado correctamente
        alert("Usuario modificado correctamente");
    });*/
 
  }
 
  onFileSelected(event:any){
    const file:File = event.target.files[0];
 
    this.formData.append("fichero", file);
  }

  /*onUpdate(id: number): void{
   // const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar datos personales");
         this.router.navigate(['']);
      }
    )
  }*/

}
