import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AlgoMasterComponent } from './pages/algo-master/algo-master.component';
import { ApiSettingsComponent } from './pages/api-settings/api-settings.component';
import { CurrencyConfigComponent } from './pages/currency-config/currency-config.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { ExchangeConfigComponent } from './pages/exchange-config/exchange-config.component';
import { ExchangeTradeReportComponent } from './pages/exchange-trade-report/exchange-trade-report.component';
import { InboundChannelConfigComponent } from './pages/inbound-channel-config/inbound-channel-config.component';
import { InternalPairConfigComponent } from './pages/internal-pair-config/internal-pair-config.component';
//Components
import { LoginComponent } from './pages/login/login.component';
import { NewApiKeyComponent } from './pages/new-api-key/new-api-key.component';
import { NewCurrencyConfigComponent } from './pages/new-currency-config/new-currency-config.component';
import { NewExchangeConfigComponent } from './pages/new-exchange-config/new-exchange-config.component';
import { NewAlgoMasterComponent} from './pages/new-algo-master/new-algo-master.component';
import { NewInternalPairConfigComponent } from './pages/new-internal-pair-config/new-internal-pair-config.component';
import { NewOutboundChannelConfigComponent } from './pages/new-outbound-channel-config/new-outbound-channel-config.component';
import { NewPairConfigComponent } from './pages/new-pair-config/new-pair-config.component';
import { OutboundChannelConfigComponent } from './pages/outbound-channel-config/outbound-channel-config.component';
import { PairConfigComponent } from './pages/pair-config/pair-config.component';
import { PositionBookComponent } from './pages/position-book/position-book.component';
import { SecurityConfigComponent } from './pages/security-config/security-config.component';
import { TradeReportComponent } from './pages/trade-report/trade-report.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NewInboundChannelConfigComponent } from './pages/new-inbound-channel-config/new-inbound-channel-config.component';
import { ClientMasterComponent } from './pages/client-master/client-master.component';
import { NewClientMasterComponent } from './pages/new-client-master/new-client-master.component';
import { PriceStreamComponent } from './pages/price-stream/price-stream.component';

const routes: Routes = [
  { path: '', redirectTo: '/documentation', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard] },
  { path: 'api-settings', component: ApiSettingsComponent, canActivate: [AuthGuard] },
  { path: 'api-key', component: NewApiKeyComponent, canActivate: [AuthGuard] },
  { path: 'api-key/:id', component: NewApiKeyComponent, canActivate: [AuthGuard] },
  { path: 'pair-config', component: PairConfigComponent, canActivate: [AuthGuard] },
  { path: 'internal-pair-config', component: InternalPairConfigComponent, canActivate: [AuthGuard] },
  { path: 'currency-config', component: CurrencyConfigComponent, canActivate: [AuthGuard] },
  { path: 'exchange-config', component: ExchangeConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-currency-config', component: NewCurrencyConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-currency-config/:id', component: NewCurrencyConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-pair-config', component: NewPairConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-pair-config/:id', component: NewPairConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-exchange-config', component: NewExchangeConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-exchange-config/:id', component: NewExchangeConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-internal-pair-config', component: NewInternalPairConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-internal-pair-config/:id', component: NewInternalPairConfigComponent, canActivate: [AuthGuard] },
  { path: 'inbound-channel-config', component: InboundChannelConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-inbound-channel-config', component: NewInboundChannelConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-inbound-channel-config/:id', component: NewInboundChannelConfigComponent, canActivate: [AuthGuard] },
  { path: 'outbound-channel-config', component: OutboundChannelConfigComponent, canActivate: [AuthGuard] },
  { path: 'price-stream', component: PriceStreamComponent, canActivate: [AuthGuard] },
  { path: 'new-outbound-channel-config', component: NewOutboundChannelConfigComponent, canActivate: [AuthGuard] },
  { path: 'new-outbound-channel-config/:id', component: NewOutboundChannelConfigComponent, canActivate: [AuthGuard] },
  { path: 'algo-master', component: AlgoMasterComponent, canActivate: [AuthGuard] },
  { path: 'new-algo-master', component: NewAlgoMasterComponent, canActivate: [AuthGuard] },
  { path: 'new-algo-master/:id', component: NewAlgoMasterComponent, canActivate: [AuthGuard] },
  { path: 'client-master', component: ClientMasterComponent, canActivate: [AuthGuard] },
  { path: 'new-client-master', component: NewClientMasterComponent, canActivate: [AuthGuard] },
  { path: 'new-client-master/:id', component: NewClientMasterComponent, canActivate: [AuthGuard] },
  { path: 'security-config', component: SecurityConfigComponent, canActivate: [AuthGuard] },
  { path: 'exchange-trade-report', component: ExchangeTradeReportComponent, canActivate: [AuthGuard] },
  { path: 'trade-report', component: TradeReportComponent, canActivate: [AuthGuard] },
  { path: 'position-book', component: PositionBookComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }