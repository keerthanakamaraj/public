import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MyProfileComponent } from '../my-profile/my-profile.component';
import { LandingComponent } from '../landing/landing.component';
import { MainHeaderComponent } from '../main-header/main-header.component';
import { MenuComponent } from '../menu/menu.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularDualListBoxModule,
    NgSelectModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    LandingComponent,
    MyProfileComponent,
    MainHeaderComponent,
    MenuComponent,
    SideBarComponent,
    FavoritesComponent
  ]
})
export class HomeModule { }
