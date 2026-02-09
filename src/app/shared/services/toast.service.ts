import { Injectable, signal } from '@angular/core';

export interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts = signal<Toast[]>([]);
    private nextId = 0;

    show(message: string, type: 'success' | 'error' | 'info' = 'info') {
        const id = this.nextId++;
        const toast: Toast = { message, type, id };
        this.toasts.update(t => [...t, toast]);

        setTimeout(() => {
            this.remove(id);
        }, 3000);
    }

    remove(id: number) {
        this.toasts.update(t => t.filter(toast => toast.id !== id));
    }

    success(message: string) { this.show(message, 'success'); }
    error(message: string) { this.show(message, 'error'); }
    info(message: string) { this.show(message, 'info'); }
}
