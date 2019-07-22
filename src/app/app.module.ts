import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolTipDirective } from './tooltip.directive';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import {AppRoutingModule} from './app-routing.module';
import { AccessibilityComponent } from './accessibility/accessibility.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolTipDirective,
    ToolTipComponent,
     AccessibilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
