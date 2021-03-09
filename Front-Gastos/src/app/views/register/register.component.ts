import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterModel } from '../../models/user';
import { UtilsService } from '../../services/utils.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  form: FormGroup;
  flagErrorMessage: boolean = false;
  messageError: string;
  objectUser: UserRegisterModel = new UserRegisterModel();

  constructor(    
    private formBuilder: FormBuilder,
    private utilService: UtilsService
  ) { 
    this.buildForm();
  }

  private buildForm () {
    this.form =  this.formBuilder.group({
      names: ['', [Validators.required]],
      lastnamep: ['', [Validators.required]],
      lastnamem: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpaswword: ['', [Validators.required]],
    });
  }

  register(): void {

    if (this.form.valid) {
      this.flagErrorMessage = false;
      const password = this.form.get('password').value;
      const confirmpaswword = this.form.get('confirmpaswword').value;
  
      if (password !== confirmpaswword) {
        this.flagErrorMessage = true;
        this.messageError = 'Las contraseñas no coinciden';
        return;
      }

      this.objectUser.snames = this.form.get('names').value;
      this.objectUser.slastname = this.form.get('lastnamep').value;
      this.objectUser.slastname2 = this.form.get('lastnamem').value;
      this.objectUser.semail = this.form.get('email').value;
      this.objectUser.suser = this.form.get('username').value;
      this.objectUser.spassword = this.form.get('password').value;

      this.utilService.register(this.objectUser).subscribe((res: any) => {
          if(res.data.resultado === 0) {
            Swal.fire(
              'Satisfactorio',
              'Se creo el usuario Satisfactoriamente',
              'success'
              ).then(() => 
                {
                  window.location.href = environment.login;
                }
              );;
          } else {            
            this.flagErrorMessage = true;
            this.messageError = res.data.message;
          }
      });
    }    
  }
}
