import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagraphComponent } from './managraph/managraph.component';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MemgraphComponent } from './memgraph/memgraph.component';
import { AddNewInstanceDialogComponent } from './add-new-instance-dialog/add-new-instance-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MemgraphWithQueryComponent } from './memgraph-with-query/memgraph-with-query.component';
import { HttpErrorHandlingInterceptor } from './interceptors/http-error-handling.interceptor';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ErrorComponent } from './error/error.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ManagraphComponent,
    MemgraphComponent,
    AddNewInstanceDialogComponent,
    MemgraphWithQueryComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
