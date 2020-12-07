import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { KeycloakService } from '@internal-apps/hsdg-front-lib';

if (environment.production) {
  enableProdMode();
}

KeycloakService
  .init(environment.keycloakRootUrl, environment.realm, environment.clientId)
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch(err => console.error(err));
