import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';

@Component({
  selector: 'app-simp-timer',
  templateUrl: './simp-timer.component.html',
  styleUrls: ['./simp-timer.component.css']
})
export class SimpTimerComponent implements OnInit {

  @Output() onTimeTickEvent = new EventEmitter();
  @Input() isQuery = false;
  intervaloSalva: number;

  constructor(private _configService: RuntimeConfigLoaderService) { }

  ngOnInit() {
    this.intervaloSalva = parseInt(this._configService.getConfigObjectKey("intervaloSalva")) * 1000;
    this.timer();
  }

  timer() {
    let intervalId = setInterval(() => {

      if(this.isQuery){
        clearInterval(intervalId);
      } else {
        this.onTimeTickEvent.emit();
      }

    }, this.intervaloSalva);
  }

}
