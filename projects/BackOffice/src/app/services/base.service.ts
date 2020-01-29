import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  public getData = (route: string, id?: number) => {
    return this.http.get(this.createCompleteRoute(environment.urlAddress, route, id));
  }

  public create = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(environment.urlAddress, route), body, this.generateHeaders());
  }

  public update = (route: string, body, id?: number) => {
    return this.http.put(this.createCompleteRoute(environment.urlAddress, route, id), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(environment.urlAddress, route));
  }

  private createCompleteRoute = (envAddress: string, route: string, id?: number) => {
    if (id) {
      return `${envAddress}/${route}/${id}`;
    }
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}