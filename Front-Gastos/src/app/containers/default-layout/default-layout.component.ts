import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { UtilsService } from '../../services/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    private utilService:  UtilsService
  ) {

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(): void {
    debugger;
    this.utilService.logout().subscribe((res : any) => {
      console.log(res);
      sessionStorage.clear();
      window.location.href = environment.login;
    });
  }
}
