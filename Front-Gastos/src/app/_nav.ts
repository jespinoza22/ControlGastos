import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Ingresos',
    url: '/incomes',
    icon: 'icon-cursor'
  },
  {
    name: 'Gastos',
    url: '/expenses',
    icon: 'icon-pie-chart'
  },  
  {
    name: 'Mantenimiento',
    url: '/maintance',
    icon: 'cil-settings',
    children: [
      {
        name: 'Tipo',
        url: '/maintance/type',
        icon: 'icon-puzzle'
      }
    ]
  }, 
  {
    divider: true
  },
  {
    name: 'Cerrar Sesión',
    url: '/logout',
    icon: 'cil-account-logout'    
  }
];
