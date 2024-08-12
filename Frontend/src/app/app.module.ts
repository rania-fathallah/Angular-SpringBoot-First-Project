import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BaseURL } from './shared/baseUrl';
import { ProcesshttpmsgService } from './services/process-httpmsg.service';
import { PostService } from './services/post.service';
import {HttpClientModule} from '@angular/common/http';
import { uploadUrl } from './shared/uploadUrl';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    CatalogueComponent,
    SignInComponent,
    EditPostComponent,
    PostDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    {provide:'BaseURL', useValue:BaseURL},
    {provide:'UploadURL', useValue:uploadUrl},
    ProcesshttpmsgService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
