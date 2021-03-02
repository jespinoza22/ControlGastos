import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  listCategories(id_category: number): Observable<any> {
    return this.http.get<any>(`/utils/listCategories/${id_category}`);
  }

  login(): Observable<any> {
    return this.http.post<any>('/auth/sign-in', null);
  }
}
