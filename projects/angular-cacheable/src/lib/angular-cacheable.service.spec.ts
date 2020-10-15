import { TestBed } from '@angular/core/testing';

import { CacheableService } from './cacheable.service';

describe('CacheableService', () => {
  let service: CacheableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
