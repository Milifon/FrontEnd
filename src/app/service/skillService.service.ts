import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  expURL = ' https://backendmili.herokuapp.com/skill/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(this.expURL + 'lista');
  }

  public detail(id: number): Observable<Skill>{
    return this.httpClient.get<Skill>(this.expURL + `detail/${id}`);
  } 

  public save(skill: FormData): Observable<any>{
    return this.httpClient.post<any>(this.expURL + 'create', skill);
  }

  public update(id: number, skill: FormData): Observable<any>{
    return this.httpClient.put<any>(this.expURL + `update/${id}`, skill);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.expURL + `delete/${id}`);
  }

  public getSkill(id: number): Observable<Skill>{
    return this.httpClient.get<Skill>(this.expURL+ `traer/${id}`);
  }
}