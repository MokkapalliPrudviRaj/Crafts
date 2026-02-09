import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div *ngFor="let toast of toastService.toasts()" 
           [ngClass]="{
             'bg-green-600 text-white': toast.type === 'success',
             'bg-red-600 text-white': toast.type === 'error',
             'bg-blue-600 text-white': toast.type === 'info'
           }"
           class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] animate-slide-in">
        
        <lucide-icon [name]="getIcon(toast.type)" class="w-5 h-5"></lucide-icon>
        <span class="flex-grow font-medium">{{ toast.message }}</span>
        
        <button (click)="toastService.remove(toast.id)" class="p-1 hover:bg-black/10 rounded">
          <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
        </button>
      </div>
    </div>
  `,
    styles: [`
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
    toastService = inject(ToastService);

    getIcon(type: string) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'alert-circle';
            default: return 'info';
        }
    }
}
