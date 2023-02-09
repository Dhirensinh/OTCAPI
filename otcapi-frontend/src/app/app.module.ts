import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { LoaderInterceptor } from './intercepter/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './pages/login/login.component';
import { BasicAuthInterceptor } from './intercepter/basic-auth.interceptor';
import { AppHttpInterceptor } from './intercepter/http.interceptor';
import { ConfirmationDialogComponent } from './popup/confirmation-dialog/confirmation-dialog.component';
import { ApiSettingsComponent } from './pages/api-settings/api-settings.component';
import { NewApiKeyComponent } from './pages/new-api-key/new-api-key.component';
import { PairConfigComponent } from './pages/pair-config/pair-config.component';
import { ExchangeTradeReportComponent } from './pages/exchange-trade-report/exchange-trade-report.component';
import { TradeReportComponent } from './pages/trade-report/trade-report.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CurrencyConfigComponent } from './pages/currency-config/currency-config.component';
import { PositionBookComponent } from './pages/position-book/position-book.component';
import { ApiKeyConfigService } from './services/api-key-config.service';
import { DisplayKeyPopupComponent } from './popup/display-key-popup/display-key-popup.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NewPairConfigComponent } from './pages/new-pair-config/new-pair-config.component';
import { NewCurrencyConfigComponent } from './pages/new-currency-config/new-currency-config.component';
import { NewInternalPairConfigComponent } from './pages/new-internal-pair-config/new-internal-pair-config.component';
import { InternalPairConfigComponent } from './pages/internal-pair-config/internal-pair-config.component';
import { NewExchangeConfigComponent } from './pages/new-exchange-config/new-exchange-config.component';
import { ExchangeConfigComponent } from './pages/exchange-config/exchange-config.component';
import { NewOutboundChannelConfigComponent } from './pages/new-outbound-channel-config/new-outbound-channel-config.component';
import { CurrencyConfigService } from './services/currency-config.service';
import { ExchangeConfigService } from './services/exchange-config.service';
import { PairConfigService } from './services/pair-config.service';
import { ChannelConfigService } from './services/channel-config.service';
import { InboundChannelConfigComponent } from './pages/inbound-channel-config/inbound-channel-config.component';
import { OutboundChannelConfigComponent } from './pages/outbound-channel-config/outbound-channel-config.component';
import { AlgoMasterComponent } from './pages/algo-master/algo-master.component';
import { NewInboundChannelConfigComponent } from './pages/new-inbound-channel-config/new-inbound-channel-config.component';
import { NewAlgoMasterComponent } from './pages/new-algo-master/new-algo-master.component';
import { AlgoMasterService } from './services/algo-master.service';
import { ClientMasterService } from './services/client-master.service';
import { ClientMasterComponent } from './pages/client-master/client-master.component';
import { NewClientMasterComponent } from './pages/new-client-master/new-client-master.component';
import { PriceStreamComponent } from './pages/price-stream/price-stream.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DocumentationComponent,
    ConfirmationDialogComponent,
    ApiSettingsComponent,
    NewApiKeyComponent,
    PairConfigComponent,
    CurrencyConfigComponent,
    OutboundChannelConfigComponent,
    InboundChannelConfigComponent,
    ExchangeTradeReportComponent,
    TradeReportComponent,
    UserProfileComponent,
    PositionBookComponent,
    DisplayKeyPopupComponent,
    NewPairConfigComponent,
    NewCurrencyConfigComponent,
    NewInternalPairConfigComponent,
    InternalPairConfigComponent,
    NewExchangeConfigComponent,
    ExchangeConfigComponent,
    NewOutboundChannelConfigComponent,
    NewInboundChannelConfigComponent,
    AlgoMasterComponent,
    NewAlgoMasterComponent,
    ClientMasterComponent,
    NewClientMasterComponent,
    PriceStreamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    AgGridModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    }),
    ClipboardModule
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    ApiKeyConfigService,
    CurrencyConfigService,
    ExchangeConfigService,
    PairConfigService,
    ChannelConfigService,
    AlgoMasterService,
    ClientMasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
