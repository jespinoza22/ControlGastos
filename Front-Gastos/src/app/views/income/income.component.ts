import { FilterIncome, IncomeModel } from './../../models/income';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
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
  public bsConfigInicio: Partial<BsDatepickerConfig>;
  

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService
  ) { 
    this.localeService.use('es');
    this.titleModal = "Nuevo Ingreso";
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
    var objeto1 = new IncomeModel();
    objeto1.idIncome = 1;
    objeto1.idCategory = 1;
    objeto1.descriptionCategory = 'Sueldo';
    objeto1.description = 'Pago Sueldo';
    objeto1.dateIncome = new Date();
    objeto1.amount = 150.5;
    
    var objeto2 = new IncomeModel();
    objeto2.idIncome = 2;
    objeto2.idCategory = 2;
    objeto2.descriptionCategory = 'Sueldo';
    objeto2.description = 'Pago Sueldo';
    objeto2.dateIncome = new Date();
    objeto2.amount = 172.5;

    var objeto3 = new IncomeModel();
    objeto3.idIncome = 3;
    objeto3.idCategory = 2;
    objeto3.descriptionCategory = 'Sueldo';
    objeto3.description = 'Pago Sueldo';
    objeto3.dateIncome = new Date();
    objeto3.amount = 73;

    var objeto4 = new IncomeModel();
    objeto4.idIncome = 4;
    objeto4.idCategory = 2;
    objeto4.descriptionCategory = 'Freelance';
    objeto4.description = 'Pago sistema';
    objeto4.dateIncome = new Date();
    objeto4.amount = 16;

    var objeto5 = new IncomeModel();
    objeto5.idIncome = 5;
    objeto5.idCategory = 2;
    objeto5.descriptionCategory = 'Freelance';
    objeto5.description = 'Dinero prestado';
    objeto5.dateIncome = new Date();
    objeto5.amount = 69.9;

    this.listIncomes.push(objeto1);    
    this.listIncomes.push(objeto2);   
    this.listIncomes.push(objeto3);   
    this.listIncomes.push(objeto4);   
    this.listIncomes.push(objeto5);   
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
  
  findIncome(){
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
          'El ingreso fue agregado correctamente',
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
