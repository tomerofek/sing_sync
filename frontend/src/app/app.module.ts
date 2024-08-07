import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './components/partials/header/header.component';
// import { HomeComponent } from './components/pages/home/home.component';
// import { SearchComponent } from './components/partials/search/search.component';
// import { TagsComponent } from './components/partials/tags/tags.component';
// import { FoodPageComponent } from './components/pages/food-page/food-page.component';
// import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
// import { TitleComponent } from './components/partials/title/title.component';
// import { NotFoundComponent } from './components/partials/not-found/not-found.component';
// import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeViewComponent } from './components/pages/home-view/home-view.component';
import { RoomViewComponent } from './components/pages/room-view/room-view.component';
import { SongContentComponent } from './components/partials/song-content/song-content.component';
import { QueueComponent } from './components/partials/queue/queue.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { QueueViewComponent } from './components/pages/queue-view/queue-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddSongViewComponent } from './components/pages/add-song-view/add-song-view.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddSongNormalSearchComponent } from './components/partials/add-song-normal-search/add-song-normal-search.component';
import { AddSongFromUrlComponent } from './components/partials/add-song-from-url/add-song-from-url.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HighlightPipe } from './pipes/highlight.pipe'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChordsSwitchComponent } from './components/partials/chords-switch/chords-switch.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    RoomViewComponent,
    SongContentComponent,
    QueueComponent,
    QueueViewComponent,
    AddSongViewComponent,
    AddSongNormalSearchComponent,
    AddSongFromUrlComponent,
    HighlightPipe,
    ChordsSwitchComponent
    // HeaderComponent,
    // HomeComponent,
    // SearchComponent,
    // TagsComponent,
    // FoodPageComponent,
    // CartPageComponent,
    // TitleComponent,
    // NotFoundComponent,
    // LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    ClipboardModule,
    DragDropModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
