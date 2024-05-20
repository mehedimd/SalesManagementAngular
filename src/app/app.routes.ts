import { Routes } from '@angular/router';
import { AddPharmacyComponent } from './components/add-pharmacy/add-pharmacy.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { UnitComponent } from './components/unit/unit.component';
import { UnitAddComponent } from './components/unit-add/unit-add.component';
import { UnitConversionComponent } from './components/unit-conversion/unit-conversion.component';
import { AddUnitConversionComponent } from './components/add-unit-conversion/add-unit-conversion.component';
// rifat
import { ListOfProductsComponent } from './components/list-of-products/list-of-products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListOfSalesTargetsComponent } from './components/list-of-sales-targets/list-of-sales-targets.component';
import { AddSalesTargetsComponent } from './components/add-sales-targets/add-sales-targets.component';
import { ListSalesAchievementComponent } from './components/list-sales-achievement/list-sales-achievement.component';
import { AddSalesAchievementComponent } from './components/add-sales-achievement/add-sales-achievement.component';
// end rifat
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { ListOfEmployeeComponent } from './components/list-of-employee/list-of-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pharmacy', component: PharmacyComponent },
  { path: 'add', component: AddPharmacyComponent },
  { path: 'add/:id', component: AddPharmacyComponent },

  { path: 'unit', component: UnitComponent },
  { path: 'addUnit', component: UnitAddComponent },
  { path: 'addUnit/:id', component: UnitAddComponent },

  { path: 'unitConversion', component: UnitConversionComponent },
  { path: 'addUnitConversion', component: AddUnitConversionComponent },
  { path: 'addUnitConversion/:id', component: AddUnitConversionComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/add', component: OrderAddComponent },

  // rifat
  {
    path: 'List',
    component: ListOfProductsComponent,
  },
  {
    path: 'add-products',
    component: AddProductsComponent,
  },
  {
    path: 'products/:id',
    component: AddProductsComponent,
  },
  {
    path: 'List-of-SalesTarget',
    component: ListOfSalesTargetsComponent,
  },
  {
    path: 'add-salestarget',
    component: AddSalesTargetsComponent,
  },
  {
    path: 'salestargets/:id',
    component: AddSalesTargetsComponent,
  },
  {
    path: 'List-of-SalesAchievement',
    component: ListSalesAchievementComponent,
  },
  {
    path: 'add-SalesAchievement',
    component: AddSalesAchievementComponent,
  },
  {
    path: 'SalesAchievement/:id',
    component: AddSalesAchievementComponent,
  },
  // end rifat

  {path:'employee',component:ListOfEmployeeComponent},
  {path:'add-employee',component:AddEmployeeComponent},

  { path: '**', component: NotFoundComponent },
];
