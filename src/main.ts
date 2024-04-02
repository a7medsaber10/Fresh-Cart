import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
document.body.style.overflowX = 'hidden'

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
