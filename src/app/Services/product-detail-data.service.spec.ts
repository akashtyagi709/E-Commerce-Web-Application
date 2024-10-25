import { TestBed } from '@angular/core/testing';

import { ProductDetailDataService } from './product-detail-data.service';

describe('ProductDetailDataService', () => {
  let service: ProductDetailDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
