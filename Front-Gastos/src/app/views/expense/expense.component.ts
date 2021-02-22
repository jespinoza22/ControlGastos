import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FilterExpense, ExpenseModel } from '../../models/expense';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
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
  public bsConfigInicio: Partial<BsDatepickerConfig>;

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('es');
    this.titleModal = "Nuevo Gasto";
    this.buildForm();
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

    // tempExpenses 
    var objeto1 = new ExpenseModel();
    objeto1.idExpense = 1;
    objeto1.idCategory = 1;
    objeto1.descriptionCategory = 'Entretenimiento';
    objeto1.description = 'Pago Netflix';
    objeto1.dateExpense = new Date();
    objeto1.amount = 150.5;

    var objeto2 = new ExpenseModel();
    objeto2.idExpense = 2;
    objeto2.idCategory = 2;
    objeto2.descriptionCategory = 'Recibo';
    objeto2.description = 'Pago Luz';
    objeto2.dateExpense = new Date();
    objeto2.amount = 172.5;

    var objeto3 = new ExpenseModel();
    objeto3.idExpense = 3;
    objeto3.idCategory = 2;
    objeto3.descriptionCategory = 'Recibo';
    objeto3.description = 'Pago Agua';
    objeto3.dateExpense = new Date();
    objeto3.amount = 73;

    var objeto4 = new ExpenseModel();
    objeto4.idExpense = 4;
    objeto4.idCategory = 2;
    objeto4.descriptionCategory = 'Recibo';
    objeto4.description = 'Pago Amazon';
    objeto4.dateExpense = new Date();
    objeto4.amount = 16;

    var objeto5 = new ExpenseModel();
    objeto5.idExpense = 5;
    objeto5.idCategory = 2;
    objeto5.descriptionCategory = 'Recibo';
    objeto5.description = 'Pago Telefono';
    objeto5.dateExpense = new Date();
    objeto5.amount = 69.9;

    this.listExpenses.push(objeto1);  
    this.listExpenses.push(objeto2);  
    this.listExpenses.push(objeto3);  
    this.listExpenses.push(objeto4);  
    this.listExpenses.push(objeto5);    
  }

  initComponent() {
    this.filter.category = 0;
    var date = new Date();
    this.filter.dateRange = [new Date(date.getFullYear(), date.getMonth(), 1), new Date(date.getFullYear(), date.getMonth() + 1, 0)];
  }

  private buildForm () {
    var dateNow = new Date();
    this.form =  this.formBuilder.group({
      category: ['', [Validators.required]],
      date: [dateNow, [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(/((\d+)((\.\d{1,2})?))$/)]]
    });
  }

  numbersOnly(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
  }

  findExpense(){
    console.log('rango 1 =>',this.filter.dateRange[0]);
    console.log('rango 2 =>',this.filter.dateRange[1]);
    console.log('categoria =>',this.filter.category);
    console.log('descripcion =>',this.filter.description);
  }

  save() {
    if(this.form.valid){
      console.log(this.form.value);

      console.log(this.form.get('amount').value);
      if (true) {
          Swal.fire(
          'Satisfactorio',
          'El gasto fue agregado correctamente',
          'success'
          ).then(() => 
            {
              this.form.reset();
              this.buildForm();
              this.primaryModal.hide();
            }
          );;
      } else {
        Swal.fire(
          '',
          'Hubo un error al guardar la información',
          'info'
          )
      } 
    } else {
      this.form.markAllAsTouched();
    }
  }
}
