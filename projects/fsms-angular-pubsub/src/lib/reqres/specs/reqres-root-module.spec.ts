import { TestBed } from '@angular/core/testing';
import {
  DefineMessage,
  IMessage,
  IMessageSchema,
} from '../../contracts/message';
import { PubsubService } from '../../pubsub/pubsub.service';
import { ComposedRequest, ComposedResponse } from '../req-res-definitions';
import {
  RequestHandler,
  RequestInterceptor,
  ResponseInterceptor,
} from '../reqres-decorator';
import { ReqresModule } from '../reqres.module';

fdescribe('Reqres Module', () => {
  let service: PubsubService;

  @DefineMessage<IMessageSchema>()
  class FetchOrder implements IMessage {
    static messageType = '[Sells] FetchOrder Order';
    messageType = FetchOrder.messageType;
    constructor(public payload?: { orderId: string }) {}
  }
  @RequestHandler({ messages: [FetchOrder] })
  class OrderRequestHandler {
    handle(message: IMessage) {}
  }

  @RequestInterceptor({ messages: [FetchOrder] })
  class OrderRequestInterceptor {
    handle(vm: ComposedRequest) {
      vm.orderId = 'xyz';
    }
  }

  @ResponseInterceptor({ messages: [FetchOrder] })
  class OrderResponseInterceptor {
    handle(vm: ComposedResponse) {
      const x = vm.x;
      console.log(x);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReqresModule.forRoot({
          requestHandlers: [OrderRequestHandler],
          requestInterceptors: [OrderRequestInterceptor],
          responseInterceptors: [OrderResponseInterceptor],
        }),
      ],
    });
    service = TestBed.inject(PubsubService);
  });

  it('create module', async () => {
    const res = await service.request(new FetchOrder({ orderId: '123' }));
  });
});
