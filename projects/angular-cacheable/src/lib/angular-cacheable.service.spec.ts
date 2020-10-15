import { TestBed } from '@angular/core/testing';

import { AngularCacheableService } from './angular-cacheable.service';

describe('AngularCacheableService', () => {
  let service: AngularCacheableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularCacheableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
