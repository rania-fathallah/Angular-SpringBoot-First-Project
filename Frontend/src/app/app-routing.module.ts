import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path: '', component: CatalogueComponent},
  {path: 'about', component :AboutComponent},
  {path: 'contact', component :ContactComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'post/:id', component : PostDetailComponent},
  {path: 'post/edit/:id', component : EditPostComponent,canActivate:[authGuard]},
  {path: 'home', redirectTo:''},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
