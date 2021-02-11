import { TestBed } from '@angular/core/testing';
import { ShipOrderService } from './ship-order.service';

fdescribe('ShipOrderService', () => {
  let shipOrderService: ShipOrderService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ShipOrderService],
    }).compileComponents();
    shipOrderService = TestBed.inject(ShipOrderService);
  });
  it('can ship', () => {
    expect(shipOrderService).toBeDefined();
  });
});
