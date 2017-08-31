import * as _ from 'lodash';
import * as React from 'react';

import {Notification} from './notification';

import {eventBus} from './lib/event-bus';

export interface NotificationModel {
  text: string;
  props: NotificationsProps;
  id: string;
}

interface NotificationsProps {
	position?: string;
	newestOnTop?: boolean;
	maxOpened?: number;
	preventDuplicates?: boolean;
}

interface NotificationsState {
  notifications: NotificationModel[];
  counter: number;
}

export class Notifications extends React.Component<NotificationsProps, NotificationsState> {

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    maxOpened: 10,
    preventDuplicates: true,
  }

  constructor(props: NotificationsProps) {
    super(props);

    this.state = {
      counter: 0,
      notifications: [],
    };

    this.addNotification = this.addNotification.bind(this);
    this.onClose = this.onClose.bind(this);
    eventBus.on('notification', this.addNotification);
  }

  private onClose = (notification: NotificationModel) => {
    const notifications = _.reject(this.state.notifications, { id: notification.id });
    this.setState({notifications});
  }

  addNotification(notification: NotificationModel) {
    let notifications = _.assign({}, this.state.notifications);
    if (!this.props.preventDuplicates || !_.some(this.state.notifications, (note) => {
      return notification.text === note.text;
    })) {
      let counter = this.state.counter;
      notifications[counter] = _.assign({}, notification, { id: this.state.counter });

      const ids = _.map(notifications, 'id');
      if (ids.length >= (this.props.maxOpened || Notifications.defaultProps.maxOpened)) {
        const oldestId = _.head(ids);
        notifications = _.reject(notifications, { id: oldestId });
      }

      this.setState({notifications, counter: ++counter});
    }
  }

  renderNotifications() {
    let notifications = _.assign({}, this.state.notifications);
    notifications = _.orderBy(notifications, 'id', this.props.newestOnTop ? 'desc' : 'asc');

    return _.map(notifications, (notification) => {
      return (
        <Notification {...notification.props} key={notification.id} onClose={() => this.onClose(notification)}>{notification.text}</Notification>
      );
    });
  }

  render() {
    return (
      <div id='toast-container' className={`toast-${this.props.position}`}>
        {this.renderNotifications()}
      </div>
    );
  }
}
