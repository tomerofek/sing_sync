import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongFromUrlComponent } from './add-song-from-url.component';

describe('AddSongFromUrlComponent', () => {
  let component: AddSongFromUrlComponent;
  let fixture: ComponentFixture<AddSongFromUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSongFromUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongFromUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
