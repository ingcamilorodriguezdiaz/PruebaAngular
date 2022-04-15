import { AppComponent } from "./app.component";



export const routes = [
  {
    path: 'Vista/Login',
    component: AppComponent,   
  },
  { path: '**', redirectTo: '/Vista/Login' },


];
