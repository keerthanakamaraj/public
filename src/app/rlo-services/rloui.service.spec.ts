import { TestBed } from '@angular/core/testing';

import { RlouiService } from './rloui.service';

describe('RlouiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RlouiService = TestBed.get(RlouiService);
    expect(service).toBeTruthy();
  });
});
