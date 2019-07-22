import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';



const routes: Routes = [

  {path: 'ToolTipDemo', component: ToolTipComponent},
  {path: 'accessibility', component: AccessibilityComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
