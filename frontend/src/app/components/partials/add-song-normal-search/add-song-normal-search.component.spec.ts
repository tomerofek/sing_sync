import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongNormalSearchComponent } from './add-song-normal-search.component';

describe('AddSongNormalSearchComponent', () => {
  let component: AddSongNormalSearchComponent;
  let fixture: ComponentFixture<AddSongNormalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSongNormalSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongNormalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
