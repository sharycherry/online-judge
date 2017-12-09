import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { DataService } from './services/data.service';
import { CollaborationService } from './services/collaboration.service'
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    NewProblemComponent,
    ProblemDetailComponent,
    NavbarComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [DataService,
  {
    provide: 'collaboration',
    useClass: CollaborationService
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
