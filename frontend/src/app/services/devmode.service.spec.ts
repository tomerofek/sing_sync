import { TestBed } from '@angular/core/testing';

import { DevmodeService } from './devmode.service';

describe('DevmodeService', () => {
  let service: DevmodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevmodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
