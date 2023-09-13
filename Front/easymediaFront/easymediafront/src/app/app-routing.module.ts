import { AllPublicationsComponent } from './all-publications/all-publications.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PostsComponent } from './posts/posts.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'create-publication', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'my-publications', component: MyPublicationsComponent, canActivate: [AuthGuard] },
  { path: 'all-publications', component: AllPublicationsComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
