import { TestBed } from '@angular/core/testing';
import { PubSubModule } from '../public-api';
import { PubSubService } from './pubsub.service';



describe('PubSubService', () => {
  let service: PubSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        PubSubModule.forRoot()
      ]
    });
    service = TestBed.inject(PubSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
