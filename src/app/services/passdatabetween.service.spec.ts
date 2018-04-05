import { TestBed, inject } from '@angular/core/testing';

import { PassdatabetweenService } from './passdatabetween.service';

describe('PassdatabetweenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassdatabetweenService]
    });
  });

  it('should be created', inject([PassdatabetweenService], (service: PassdatabetweenService) => {
    expect(service).toBeTruthy();
  }));
});
