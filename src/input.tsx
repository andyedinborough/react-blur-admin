import * as _ from 'lodash';
import * as React from 'react';

interface InputProps {
	type?: string;
	id?: string;
	name?: string;
	className?: string;
	placeholder?: string;
	helpLabel?: string;
	label?: string;
	addonLeft?: {},
	addonRight?: {};
	autoFocus?: boolean;
	hasFeedbackIcon?: boolean;
	onValidate?: (value: number | string | boolean) => string | boolean;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	defaultChecked?: boolean;
	value: number | string | boolean;
	onChange: (value?: string | boolean | number) => void;
	disabled?: boolean;
	isRounded?: boolean;
}
interface InputState { }

export class Input extends React.Component<InputProps, InputState> {

  static defaultProps = {
    className: '',
    value: '',
    type: 'text',
    hasFeedbackIcon: true,
    disabled: false,
    onKeyDown: _.noop,
    autoFocus: false,
  }

  private _input: HTMLInputElement;

  getValidationResult() {
    if (! this.props.onValidate) {
      return '';
    }

    const validationResult = this.props.onValidate(this.props.value);

    if (validationResult === true || validationResult === 'success') {
      return 'success';
    } else if (validationResult === false || validationResult === 'error') {
      return 'error';
    } else if (validationResult === 'warning') {
      return 'warning';
    }

    return '';
  }

  /**
  * [getFeedback - determine if we should show the feedback icon on the right]
  * @return {string}
  */
  getFeedback() {
    if (! this.props.hasFeedbackIcon) {
      return '';
    }

    return 'has-feedback';
  }

  getStatus(status: string) {
    return status ? `has-${status}` : '';
  }

  renderTopLabel() {
    if (! this.props.label) {
      return null;
    }

    if (_.includes(['checkbox', 'radio'], this.props.type)) {
      return null;
    }

    return <label className='control-label' htmlFor={this.props.id}>{this.props.label}</label>;
  }

  renderAddonLeft() {
    if (! this.props.addonLeft) {
      return null;
    }

    return (
      <span className='input-group-addon input-group-addon-primary addon-left'>
        {this.props.addonLeft}
      </span>
    );
  }

  renderCheckbox() {
    const validationResult = this.getValidationResult();
    const className = validationResult ? `has-${validationResult}` : '';
    return (
      <div className={className}>
        <div className="checkbox">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              disabled={this.props.disabled}
              checked={!!this.props.value}
              onClick={this.handleChange}
              ref={this.getInputRef}
            />
            <span>{this.props.label}</span>
          </label>
        </div>
      </div>
    );
  }

  renderRadio() {
    return (
      <label className="radio-inline custom-radio nowrap">
        <input
          disabled={this.props.disabled}
          type="radio"
          name={this.props.name}
          value={String(this.props.value)}
          defaultChecked={this.props.defaultChecked}
          onClick={this.handleChange}
          ref={this.getInputRef}
        />
        <span>{this.props.label}</span>
      </label>
    );
  }

  renderInput() {
    if (_.includes(['checkbox', 'radio'], this.props.type)) {
      return this[`render${_.startCase(this.props.type)}`]();
    }

    return (
      <input
        disabled={this.props.disabled}
        type={this.props.type}
        placeholder={this.props.placeholder}
        autoFocus={this.props.autoFocus}
        className={`form-control ${this.props.isRounded ? 'form-control-rounded' : ''}`}
        key={this.props.id}
        onChange={this.handleChange}
        onKeyDown={this.props.onKeyDown}
        value={String(this.props.value)}
        ref={this.getInputRef}
      />
    );
  }

  renderInputNoWrapper() {
    if (! (this.props.addonLeft || this.props.addonRight)) {
      return this.renderInput();
    }

    return null;
  }

  renderAddonRight() {
    if (! this.props.addonRight) {
      return null;
    }

    return (
      <span className='input-group-addon input-group-addon-primary addon-right'>
        {this.props.addonRight}
      </span>
    );
  }

  renderFeedbackIcon(status: string) {
    if (! (status && this.props.hasFeedbackIcon) || this.props.addonRight) {
      return null;
    }

    if (_.includes(['checkbox', 'radio'], this.props.type)) {
      return null;
    }

    let icon;
    if (status === 'success') {
      icon = 'fa-check-circle';
    } else if (status === 'error') {
      icon = 'fa-times-circle';
    } else {
      icon = 'fa-exclamation-triangle';
    }

    return <i className={`fa ${icon} form-control-feedback`} />;
  }

  renderHelpBlock() {
    if (! this.props.helpLabel) {
      return null;
    }

    return (
      <div className='help-block sub-little-text'>{this.props.helpLabel}</div>
    );
  }

  renderInputWrapper() {
    if (! (this.props.addonLeft || this.props.addonRight)) {
      return null;
    }

    return (
      <div className='input-group'>
        {this.renderAddonLeft()}
        {this.renderInput()}
        {this.renderAddonRight()}
      </div>
    );
  }

  render() {
    const status = this.getValidationResult(); // '', warning, success, error
    return (
      <div className={`form-group ${this.props.className} ${this.getFeedback()} ${this.getStatus(status)}`}>
        {this.renderTopLabel()}
        {this.renderInputWrapper()}
        {this.renderInputNoWrapper()}
        {this.renderFeedbackIcon(status)}
        {this.renderHelpBlock()}
      </div>
    );
  }

  private getInputRef = (input: HTMLInputElement) => {
    this._input = input;
  }

  private handleChange = () => this.props.onChange(this.props.value);
}
