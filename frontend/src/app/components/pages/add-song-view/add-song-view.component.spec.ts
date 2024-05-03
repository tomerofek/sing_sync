import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongViewComponent } from './add-song-view.component';

describe('AddSongViewComponent', () => {
  let component: AddSongViewComponent;
  let fixture: ComponentFixture<AddSongViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSongViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
