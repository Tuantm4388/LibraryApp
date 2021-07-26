import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
// library management system
import { LibNavComponent } from './libsystem/lib-nav/lib-nav.component';
import { LibMemberDetailComponent } from './libsystem/lib-members/lib-member-detail/lib-member-detail.component';
import { LibMemberPhotoEditComponent } from './libsystem/lib-members/lib-member-photo-edit/lib-member-photo-edit.component';
import { LibUserRegisterComponent } from './libsystem/lib-members/lib-user-register/lib-user-register.component';
import { LibUserEditComponent } from './libsystem/lib-members/lib-user-edit/lib-user-edit.component';
import { LibUserListComponent } from './libsystem/lib-members/lib-user-list/lib-user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LibHomeComponent } from './libsystem/lib-home/lib-home.component';
import { LibCardBookComponent } from './libsystem/lib-books/lib-card-book/lib-card-book.component';
import { LibTextInputComponent } from './_forms/lib-text-input/lib-text-input.component';
import { LibDeleteUserComponent } from './libsystem/lib-dialog/lib-delete-user/lib-delete-user.component';
import { LibUserRolesComponent } from './libsystem/lib-dialog/lib-user-roles/lib-user-roles.component';
import { LibChagnePassComponent } from './libsystem/lib-members/lib-chagne-pass/lib-chagne-pass.component';
import { LibBookListComponent } from './libsystem/lib-books/lib-book-list/lib-book-list.component';
import { LibBookInfoComponent } from './libsystem/lib-books/lib-book-info/lib-book-info.component';
import { LibBorrowRegisterComponent } from './libsystem/lib-borrows/lib-borrow-register/lib-borrow-register.component';
import { LibMessageComponent } from './libsystem/lib-dialog/lib-message/lib-message.component';
import { LibBookAddComponent } from './libsystem/lib-books/lib-book-add/lib-book-add.component';
import { LibBookInputComponent } from './libsystem/lib-books/lib-book-input/lib-book-input.component';
import { LibPhotoEditDialogComponent } from './libsystem/lib-dialog/lib-photo-edit-dialog/lib-photo-edit-dialog.component';
import { LibBookEditComponent } from './libsystem/lib-books/lib-book-edit/lib-book-edit.component';
import { LibStoreListComponent } from './libsystem/lib-stores/lib-store-list/lib-store-list.component';
import { LibStoreEditComponent } from './libsystem/lib-dialog/lib-store-edit/lib-store-edit.component';
import { LibBorrowListComponent } from './libsystem/lib-borrows/lib-borrow-list/lib-borrow-list.component';
import { LibBorrowHistoryComponent } from './libsystem/lib-borrows/lib-borrow-history/lib-borrow-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    LibNavComponent,
    LibMemberDetailComponent,
    LibMemberPhotoEditComponent,
    LibUserRegisterComponent,
    LibUserEditComponent,
    LibUserListComponent,
    LibHomeComponent,
    LibCardBookComponent,
    LibTextInputComponent,
    LibDeleteUserComponent,
    LibUserRolesComponent,
    LibChagnePassComponent,
    LibBookListComponent,
    LibBookInfoComponent,
    LibBorrowRegisterComponent,
    LibMessageComponent,
    LibBookAddComponent,
    LibBookInputComponent,
    LibPhotoEditDialogComponent,
    LibBookEditComponent,
    LibStoreListComponent,
    LibStoreEditComponent,
    LibBorrowListComponent,
    LibBorrowHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
