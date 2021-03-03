import { Injectable } from '@angular/core';
import { ReqresModule } from '../reqres.module';

fdescribe('Reqres Module', () => {
  it('create module', () => {
    ReqresModule.forRoot({
      requestHandlers: [OrderRequestHandler],
      requestInterceptors: [OrderRequestInterceptor],
      responseInterceptors: [OrderResponseInterceptor]
    });
  });
});


@Injectable()
class OrderRequestHandler {

}

@Injectable()
class OrderRequestInterceptor {

}

@Injectable()
class OrderResponseInterceptor {

}


