import { TestBed } from '@angular/core/testing';

import { ManagraphService } from './managraph.service';

describe('ManagraphService', () => {
  let service: ManagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
