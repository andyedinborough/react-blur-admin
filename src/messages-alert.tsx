import * as React from 'react';
import { User } from './User';

interface MessagesAlertProps {
	user: User,
	subject?: string;
	createdAt?: string;
	onClick?: () => void;
	relativeTime?: string;
	timestamp?: string;
}
interface MessagesAlertState { }

export class MessagesAlert extends React.Component<MessagesAlertProps, MessagesAlertState> {

  onClick() {
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
          <span title={this.props.timestamp}>{this.props.relativeTime}</span>
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
