import { FilterIncome } from './../../models/income';
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
        dateInputFormat: 'dd/MM/yyyy',
        locale: 'es',
        containerClass: 'theme-blue',
        showWeekNumbers: false,
        isAnimated: true
      });
  }

  initComponent() {
    this.filter.category = 0;
    var date = new Date();
    this.filter.dateRange = [new Date(date.getFullYear(), date.getMonth(), 1), new Date(date.getFullYear(), date.getMonth() + 1, 0)];
  }

  private buildForm () {
    this.form =  this.formBuilder.group({
      category: ['', [Validators.required]],
      date: ['', [Validators.required]],
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
