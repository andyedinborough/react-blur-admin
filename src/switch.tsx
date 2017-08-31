import * as React from 'react';

interface SwitchProps {
	isOn?: boolean;
	onLabel?: string;
	offLabel?: string;
	onChange?: () => void;
	type?: 'primary' | 'info' | 'warning' | 'success' | 'danger',
	className?: string;
	disabled?: boolean;
}

interface SwitchState { }

export class Switch extends React.Component<SwitchProps, SwitchState> {

  static defaultProps = {
    isOn: true,
    onLabel: 'ON',
    offLabel: 'OFF',
    type: 'primary',
    className: '',
    disabled: false,
  }

  private onChange = () => {
    if (this.props.disabled) {
      return false;
    }

    return this.props.onChange && this.props.onChange();
  }

  renderOn() {
    return (
      <div className="bootstrap-switch-container">
        <span className={`bootstrap-switch-handle-on bootstrap-switch-${this.props.type}`}>{this.props.onLabel}</span>
        <span className="bootstrap-switch-label">&nbsp;</span>
      </div>
    );
  }

  renderOff() {
    return (
      <div className="bootstrap-switch-container">
        <span className="bootstrap-switch-label pull-left">&nbsp;</span>
        <span className="bootstrap-switch-handle-off bootstrap-switch-default pull-right">{this.props.offLabel}</span>
      </div>
    );
  }

  render() {
    return (
      <div className={`switch-container ${this.props.isOn ? this.props.type : ''} ${this.props.className}`} onClick={this.onChange}>
        <div className={`bootstrap-switch ${this.props.disabled ? 'bootstrap-switch-disabled' : ''} bootstrap-switch-wrapper bootstrap-switch-small bootstrap-switch-animate bootstrap-switch-on`}>
         {this.props.isOn ? this.renderOn() : this.renderOff()}
        </div>
      </div>
    );
  }
}
