import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  visibleSpinner: boolean = false;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.visible.subscribe(visible => this.visibleSpinner = visible);
  }
}
