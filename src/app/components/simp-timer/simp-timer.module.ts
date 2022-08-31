import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpTimerComponent } from './simp-timer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SimpTimerComponent],
  exports: [SimpTimerComponent]
})
export class SimpTimerModule { }
