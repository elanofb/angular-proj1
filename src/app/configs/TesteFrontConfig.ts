import { environment } from './../../environments/environment';
import { HsdgFrontConfig } from '@internal-apps/hsdg-front-lib';
import { version } from '../../../package.json';

export const frontLibConfigs: HsdgFrontConfig = {
  envName: environment.env_name,
  appVersion: version,
  idmAppClientId: environment.clientId,
  shouldHideBackToHub: true,
  userMngtEndpoint: environment.userMngtEndpoint,
  links: [
    { name: "Home", url: "/", iconName: "home", roles: ["USER"] },
    ...
    {
      name: "Notifications",
      url: "/notifications",
      iconName: "message",
      roles: ["NOTIFICATION_CREATE", "NOTIFICATION_UPDATE", "NOTIFICATION_DELETE"]
    },
  ],
  changelog: [
    {
      version: '1.3.0',
      items: [
        {
          title: 'Service ... filter is now at the top',
          description: 'And it auto-completes when you type.'
        }
        ]
    },
    ...
  ]

};
