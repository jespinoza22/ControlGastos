import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncomeModel } from '../models/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  createIncome(income: IncomeModel) {
    return this.http.post<any>('/income/save', income);
  }
 
  listIncome(filter) : Observable<Object[]> {
    return this.http.post<Object[]>('/income/search', filter);
  }

  deleteIncome(id_income) : Observable<any> {
    return this.http.delete<any>(`/income/delete/${id_income}`);
  }
}
