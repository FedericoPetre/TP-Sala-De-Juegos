import { TestBed } from '@angular/core/testing';

import { PeticionHTTPService } from './peticion-http.service';

describe('PeticionHTTPService', () => {
  let service: PeticionHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
