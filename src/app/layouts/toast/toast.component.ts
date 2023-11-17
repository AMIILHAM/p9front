import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast-service';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="toast.autohide"
      [delay]="toast.delay || 2000"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)"
    >
      <button type="button" class="close" aria-label="Close" (click)="toastService.remove(toast)">
        <span aria-hidden="true">&times;</span>
      </button>

      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text><i class="icon-"></i> {{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
}
