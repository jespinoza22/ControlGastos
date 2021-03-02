import { FilterIncome, IncomeModel } from './../../models/income';
import { UtilsService } from '../../services/utils.service';
import { Category } from '../../models/utils';
import { IncomeService } from '../../services/income.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { getDate, getMonth } from 'ngx-bootstrap/chronos/utils/date-getters';
defineLocale('es', esLocale);
 
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  titleModal: string;
  form: FormGroup;
  filter: FilterIncome = new FilterIncome();
  listIncomes: IncomeModel[] = [];
  listIncomesTemp: IncomeModel[] = [];
  public bsConfigInicio: Partial<BsDatepickerConfig>;
  listCategory: Category[] = [];
  income :IncomeModel =  new IncomeModel();
  incomeEdit :IncomeModel =  null;
  totalItems: number = 0;
  currentPage: number   = 1;

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private utilService: UtilsService,
    private incomeService: IncomeService,
    private spinner: NgxSpinnerService,
  ) { 
    this.localeService.use('es');
    this.titleModal = "Nuevo Ingreso";
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
    this.findIncome();
  }

  initComponent() {
    this.filter.category = 0;
    var date = new Date();
    this.filter.dateRange = [new Date(date.getFullYear(), date.getMonth(), 1), new Date(date.getFullYear(), date.getMonth() + 1, 0)];
  }

  private buildForm (isEdit: boolean, income: IncomeModel) {
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
      var dateIncome = new Date(income.dateIncome);
      this.form =  this.formBuilder.group({
        category: [income.idCategory, [Validators.required]],
        date: [dateIncome, [Validators.required]],
        description: [income.description, [Validators.required]],
        amount: [income.amount, [Validators.required, Validators.pattern(/((\d+)((\.\d{1,2})?))$/)]]
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
      this.utilService.listCategories(1).subscribe((res: any) => {
        this.listCategory = res.data;
      });
  }

  findIncome(){
    this.spinner.show();
    let dateStart = this.filter.dateRange[0];
    dateStart = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate());
    let dateEnd = this.filter.dateRange[1];
    dateEnd = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate());
   
   this.incomeService.listIncome({
    nid_user: 1,
    dateStart,
    dateEnd,
    id_category: this.filter.category,
    description: typeof this.filter.description === 'undefined' ? '' : this.filter.description,
   }).subscribe((res: any) => {
      if (res.data != null) {
        this.listIncomes = res.data;
        this.totalItems = this.listIncomes.length;
        console.log(this.listIncomes, 'this.listIncomes');
      }
      this.spinner.hide();
   });
  }

  pageChanged(event: any) {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  deleteIncome(idIncome: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el Ingreso?',
      showDenyButton: false,
      showCancelButton: true,      
      confirmButtonText: `Eliminar`,
      confirmButtonColor: '#20a8d8',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.incomeService.deleteIncome(idIncome).subscribe((res: any) => {
            try {
              if (res.data.resultado === 0) {
                Swal.fire(
                  'Satisfactorio',
                  'Se elimino el Ingreso Correctamente',
                  'success'
                  ).then(() => 
                    {
                      this.findIncome();
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

  newIncome() {    
    this.titleModal = "Nuevo Ingreso";
    this.form.reset();
    this.buildForm(false, null);
    this.primaryModal.show();
  }

  editIncome(income: IncomeModel) {
    console.log(income, 'income');    
    this.titleModal = "Editar Ingreso";
    this.incomeEdit = new IncomeModel();
    this.incomeEdit = income;
    this.form.reset();
    this.buildForm(true, income);
    this.primaryModal.show();
  }

  save() {
    if(this.form.valid){
      this.income.amount = Number(this.form.get('amount').value);
      this.income.idCategory = Number(this.form.get('category').value);
      this.income.dateIncome = this.form.get('date').value;
      const dateInput = this.income.dateIncome;
      this.income.dateIncome = new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
      this.income.description = this.form.get('description').value;
      this.income.idCoin = 1;
      this.income.idUser = 1;
      if(this.incomeEdit !== null) this.income.idIncome = this.incomeEdit.idIncome;
      else this.income.idIncome = 0;
      
      this.incomeEdit = null;

      this.incomeService.createIncome(this.income).subscribe((res: any) => {
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
                  this.findIncome();
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
