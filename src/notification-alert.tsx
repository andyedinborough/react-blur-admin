import * as React from 'react';
import { User } from './User';

interface NotificationAlertProps {
	user: User,
	subject?: string;
	createdAt?: string;
	onClick?: () => void;
	relativeTime?: string;
	timeStamp?: string;
}
interface NotificationAlertState { }

export class NotificationAlert extends React.Component<NotificationAlertProps, NotificationAlertState> {

  private onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  renderBody() {
    return (
      <div onClick={this.onClick.bind(this)} className='clearfix'>
        <div className='img-area'>
          <img src={this.props.user.picture} className='photo-msg-item'/>
        </div>
        <div className='msg-area'>
          <div>{this.props.subject}</div>
          <span title={this.props.timeStamp}>{this.props.relativeTime}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderBody()}
      </div>
    );
  }
}
