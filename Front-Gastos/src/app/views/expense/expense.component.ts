import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FilterExpense, ExpenseModel } from '../../models/expense';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { Category } from '../../models/utils';
import { ExpenseService } from '../../services/expense.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { UtilsService } from '../../services/utils.service';
defineLocale('es', esLocale);

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  titleModal: string;
  form: FormGroup;
  filter: FilterExpense = new FilterExpense();
  listExpenses: ExpenseModel[] = [];
  listExpensesTemp: ExpenseModel[] = [];
  public bsConfigInicio: Partial<BsDatepickerConfig>;
  listCategory: Category[] = [];
  expense :ExpenseModel =  new ExpenseModel();
  expenseEdit :ExpenseModel =  null;
  totalItems: number = 0;
  currentPage: number   = 1;
  itemsPerPage: number = 10;

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private utilService: UtilsService,
    private expenseService: ExpenseService,
    private spinner: NgxSpinnerService,
  ) {
    this.localeService.use('es');
    this.titleModal = "Nuevo Gasto";
    this.buildForm(false, null);
    this.initComponent();
   }
 
  ngOnInit(): void {    
    this.bsConfigInicio = Object.assign({},
      {
        dateInputFormat: 'DD/MM/YYYY',
        locale: 'es',
        containerClass: 'theme-blue',
        showWeekNumbers: false,
        isAnimated: true
      });
    this.getListCategory();
    this.findExpense();
  }

  initComponent() {
    this.filter.category = 0;
    var date = new Date();
    this.filter.dateRange = [new Date(date.getFullYear(), date.getMonth(), 1), new Date(date.getFullYear(), date.getMonth() + 1, 0)];
  }

  private buildForm (isEdit: boolean, expense: ExpenseModel) {
    if(!isEdit) {
      var dateNow = new Date();
      this.form =  this.formBuilder.group({
        category: ['', [Validators.required]],
        date: [dateNow, [Validators.required]],
        description: ['', [Validators.required]],
        amount: ['', [Validators.required, Validators.pattern(/((\d+)((\.\d{1,2})?))$/)]]
      });
    } else {
      //var dateIncome = new Date(income.dateIncome.getFullYear(), income.dateIncome.getMonth(), income.dateIncome.getDate());
      var dateExpense = new Date(expense.dateExpense);
      this.form =  this.formBuilder.group({
        category: [expense.idCategory, [Validators.required]],
        date: [dateExpense, [Validators.required]],
        description: [expense.description, [Validators.required]],
        amount: [expense.amount, [Validators.required, Validators.pattern(/((\d+)((\.\d{1,2})?))$/)]]
      });
    }  
  }

  numbersOnly(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
  }

  getListCategory() {
    this.utilService.listCategories(2).subscribe((res: any) => {
      this.listCategory = res.data;
    });
  }

  findExpense(){
    this.spinner.show();
    let dateStart = this.filter.dateRange[0];
    dateStart = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate());
    let dateEnd = this.filter.dateRange[1];
    dateEnd = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate());
   
   this.expenseService.listExpense({
    nid_user: 1,
    dateStart,
    dateEnd,
    id_category: this.filter.category,
    description: typeof this.filter.description === 'undefined' ? '' : this.filter.description,
   }).subscribe((res: any) => {
      if (res.data != null) {
        debugger;
        this.listExpenses = res.data;
        this.totalItems = this.listExpenses.length;
        this.filterPagination();
      }
      this.spinner.hide();
   });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.filterPagination();
  }

  filterPagination() {
    this.listExpensesTemp = [];
    this.listExpensesTemp = this.listExpenses.filter((res: ExpenseModel, index: number) => {
      if ( ((this.currentPage - 1) * this.itemsPerPage) <= index && index <= (this.currentPage * this.itemsPerPage) - 1) {
        return res;
      }
    });
  }  

  deleteIncome(idExpense: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el Gasto?',
      showDenyButton: false,
      showCancelButton: true,      
      confirmButtonText: `Eliminar`,
      confirmButtonColor: '#20a8d8',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseService.deleteExpense(idExpense).subscribe((res: any) => {
            try {
              if (res.data.resultado === 0) {
                Swal.fire(
                  'Satisfactorio',
                  'Se elimino el Ingreso Correctamente',
                  'success'
                  ).then(() => 
                    {
                      this.findExpense();
                    }
                  );;
              } else {
                Swal.fire(
                  '',
                  'Hubo un error al eliminar el Ingreso',
                  'info'
                  )
              }
            } catch (error) {
              Swal.fire(
              '',
              'Hubo un error al eliminar el Ingreso',
              'info'
              )
            }
        })
      } 
    })
  }

  newExpense() {    
    this.titleModal = "Nuevo Gasto";
    this.form.reset();
    this.buildForm(false, null);
    this.primaryModal.show();
  }

  editExpense(expense: ExpenseModel) {
    this.titleModal = "Editar Gasto";
    this.expenseEdit = new ExpenseModel();
    this.expenseEdit = expense;
    this.form.reset();
    this.buildForm(true, expense);
    this.primaryModal.show();
  }

  save() {
    if(this.form.valid){
      this.expense.amount = Number(this.form.get('amount').value);
      this.expense.idCategory = Number(this.form.get('category').value);
      this.expense.dateExpense = this.form.get('date').value;
      const dateInput = this.expense.dateExpense;
      this.expense.dateExpense = new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
      this.expense.description = this.form.get('description').value;
      this.expense.idCoin = 1;
      this.expense.idUser = 1;
      if(this.expenseEdit !== null) this.expense.idExpense = this.expenseEdit.idExpense;
      else this.expense.idExpense = 0;
      
      this.expenseEdit = null;

      this.expenseService.createExpense(this.expense).subscribe((res: any) => {
        try {
          if (res.data.resultado === 0) {
            Swal.fire(
              'Satisfactorio',
              res.data.message,
              'success'
              ).then(() => 
                {
                  this.form.reset();
                  this.buildForm(false, null);
                  this.primaryModal.hide();
                  this.findExpense();
                }
              );;
          } else {
            Swal.fire(
              '',
              'Hubo un error al guardar la información',
              'info'
              )
          }
        } catch (error) {
          Swal.fire(
            '',
            'Hubo un error al guardar la información',
            'info'
            )
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
