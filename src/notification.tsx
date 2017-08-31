import * as React from 'react';

interface NotificationProps {
	title?: string;
	type?: 'success' | 'warning' | 'error' | 'info',
	timeout?: number;
	extendedTimeout?: number;
	closeButton?: boolean;
	tapToDismiss?: boolean;
	onClose: () => void;
}
interface NotificationState { }

export class Notification extends React.Component<NotificationProps, NotificationState> {

  static defaultProps = {
    title: '',
    type: 'info',
    timeout: 5000,
    extendedTimeout: 2000,
    allowHtml: true,
    closeButton: true,
    tapToDismiss: true,
	}

	private timer: number | undefined;
	private extendedTimer: number | undefined;

  constructor(props: NotificationProps) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    if (this.props.timeout) {
      this.timer = setTimeout(this.props.onClose, this.props.timeout);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.extendedTimer) {
      clearTimeout(this.extendedTimer);
    }
  }

  onMouseEnter() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onMouseLeave() {
    this.extendedTimer = setTimeout(this.props.onClose, this.props.extendedTimeout);
  }

  renderCloseButton() {
    if (!this.props.closeButton) {
      return null;
    }

    return (
      <button
        className="toast-close-button"
        onClick={this.props.onClose}
      >
        ×
      </button>
    );
  }

  renderTitle() {
    if (!this.props.title) {
      return null;
    }
    return (
      <div className='toast-title'>
        {this.props.title}
      </div>
    );
  }

  renderBody() {
    return (
      <div className='toast-body'>
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <div
        className={`toast toast-${this.props.type}`}
        onClick={this.props.tapToDismiss ? this.props.onClose : null}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderCloseButton()}
        <div>
          {this.renderTitle()}
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

