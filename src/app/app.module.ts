import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { AppSettings } from './app.settings';
import { TranslationService } from './services/translation/translation.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function createLocaleIdFactory(translationService: TranslationService) {
  return translationService.currentLanguageCode || AppSettings.defaultLanguageCode;
}

@NgModule({
  declarations: [AppComponent, HomeComponent, MapComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(AppSettings.translationConfig),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReportDialogComponent,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: createLocaleIdFactory,
      deps: [TranslationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
