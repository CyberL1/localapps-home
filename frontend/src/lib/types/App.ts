export interface App {
  id: string;
  appId: string;
  name: string;
  icon: string;
  installedAt: string;
  parts: { [key: string]: string };
}
