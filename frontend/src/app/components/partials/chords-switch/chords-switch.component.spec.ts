import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsSwitchComponent } from './chords-switch.component';

describe('ChordsSwitchComponent', () => {
  let component: ChordsSwitchComponent;
  let fixture: ComponentFixture<ChordsSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChordsSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
