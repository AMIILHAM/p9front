import { Component } from '@angular/core';
import { LoaderService } from './loader-service';


@Component({
  selector: 'app-loader',
  template: `
    <div class="progress-loader" [hidden]="!loading">
      <div class="loading-spinner">
      <img src="assets/images/loader.svg">
      </div>
    </div>
  `
})
export class LoaderComponent {
  
  loading: boolean = false;

  constructor(public loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }

}
