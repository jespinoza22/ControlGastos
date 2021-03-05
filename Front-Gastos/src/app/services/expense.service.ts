import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  createExpense(expense: ExpenseModel) {
    return this.http.post<any>('/expense/save', expense);
  }
 
  listExpense(filter) : Observable<Object[]> {
    return this.http.post<Object[]>('/expense/search', filter);
  }

  deleteExpense(id_expense) : Observable<any> {
    return this.http.delete<any>(`/expense/delete/${id_expense}`);
  }
}
