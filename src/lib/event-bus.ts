import EventEmitter from 'events';
import * as _ from 'lodash';

class EventBus extends EventEmitter {

  // this.emit('message', payload) if available by default

  addNotification(type: string, text: string, options: {}) {
    const props = _.extend(options, {
      type,
    });

    this.emit('notification', {text, props});
  }
}

export const eventBus = new EventBus();
