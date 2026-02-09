import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from './shared/icons/lucide-icons';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(LucideAngularModule.pick(LUCIDE_ICONS)),
  ],
};
