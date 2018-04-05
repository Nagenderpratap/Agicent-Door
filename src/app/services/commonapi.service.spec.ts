import { TestBed, inject } from '@angular/core/testing';

import { CommonapiService } from './commonapi.service';

describe('CommonapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonapiService]
    });
  });

  it('should be created', inject([CommonapiService], (service: CommonapiService) => {
    expect(service).toBeTruthy();
  }));
});
