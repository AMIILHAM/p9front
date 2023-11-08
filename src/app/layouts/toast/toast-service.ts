import { Injectable, TemplateRef } from '@angular/core';
import {TypeNotification} from "../../enum/type-notification";

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  showSuccess(message: string): void {
    this.show(message, { classname: 'bg-success text-light', delay: 5000, autohide: true });
  }

  showError(message: string): void {
    this.show(message, { classname: 'bg-danger text-light', delay: 7000, autohide: true });
  }

  showInfo(message: string): void {
    this.show(message, { classname: 'bg-info text-light', delay: 5000, autohide: true });
  }

  showWarning(message: string): void {
    this.show(message, { classname: 'bg-warning text-light', delay: 5000, autohide: true });
  }

  showNotif(message: string, type: TypeNotification, url?: string): void {
    this.show(message, {classname: `push-notification ${type?.toLowerCase()}`, delay: 15000, autohide: true, url: url ?? '' });
  }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
