import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
// library management system
import { LibMemberDetailComponent } from './libsystem/lib-members/lib-member-detail/lib-member-detail.component';
import { LibMemberPhotoEditComponent } from './libsystem/lib-members/lib-member-photo-edit/lib-member-photo-edit.component';
import { LibUserRegisterComponent } from './libsystem/lib-members/lib-user-register/lib-user-register.component';
import { LibUserEditComponent } from './libsystem/lib-members/lib-user-edit/lib-user-edit.component';
import { LibUserListComponent } from './libsystem/lib-members/lib-user-list/lib-user-list.component';
import { LibHomeComponent } from './libsystem/lib-home/lib-home.component';
import { LibChagnePassComponent } from './libsystem/lib-members/lib-chagne-pass/lib-chagne-pass.component';
import { LibBookListComponent } from './libsystem/lib-books/lib-book-list/lib-book-list.component';
import { LibBorrowRegisterComponent } from './libsystem/lib-borrows/lib-borrow-register/lib-borrow-register.component';
import { LibBookAddComponent } from './libsystem/lib-books/lib-book-add/lib-book-add.component';
import { LibBookEditComponent } from './libsystem/lib-books/lib-book-edit/lib-book-edit.component';
import { BookInfoResolver } from './_resolvers/book-info.resolver';
import { LibStoreListComponent } from './libsystem/lib-stores/lib-store-list/lib-store-list.component';

const routes: Routes = [
  {path: '', component: LibHomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      //{path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'members/:username', component: LibMemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'edituser/:username', component: LibUserEditComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'change-pass', component: LibChagnePassComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
      //{path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'lib-users', component: LibUserListComponent, canActivate: [AdminGuard]},
      {path: 'book-add', component: LibBookAddComponent, canActivate: [AdminGuard]},
      {path: 'book-edit/:idIsbn', component: LibBookEditComponent, resolve: {bookInfo: BookInfoResolver}},
      {path: 'borrow/register', component: LibBorrowRegisterComponent},
      {path: 'lib-store', component: LibStoreListComponent, canActivate: [AdminGuard]},
    ]
  },
  {path: 'book-list', component: LibBookListComponent},
  {path: 'member/register', component: LibUserRegisterComponent},
  {path: 'member/edituser', component: LibUserEditComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'photo-user-edit', component: LibMemberPhotoEditComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
