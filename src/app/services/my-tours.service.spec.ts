import { TestBed } from '@angular/core/testing';




import { MyToursService } from './my-tours.service';

describe('MyToursService', () => {
  let service: MyToursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyToursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
