import { TestBed } from '@angular/core/testing';

import { RequestModifierInterceptor } from './request-modifier.interceptor';

describe('RequestModifierInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestModifierInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestModifierInterceptor = TestBed.inject(RequestModifierInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
