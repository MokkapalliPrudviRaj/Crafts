import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LucideAngularModule],
  template: `
    <div class="flex h-screen">

      <aside class="w-60 bg-gray-900 text-white p-4 space-y-4">
        <h2 class="text-lg font-semibold">Angular Template</h2>

        <a routerLink="/" class="flex items-center gap-2">
          <lucide-icon name="home" class="w-4 h-4"></lucide-icon>
          Home
        </a>
      </aside>

      <main class="flex-1 p-6 bg-gray-50">
        <router-outlet />
      </main>

    </div>
  `
})
export class Shell {}
