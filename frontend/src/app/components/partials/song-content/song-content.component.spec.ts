import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongContentComponent } from './song-content.component';

describe('SongContentComponent', () => {
  let component: SongContentComponent;
  let fixture: ComponentFixture<SongContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
