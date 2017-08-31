import * as React from 'react';

interface TextareaProps {
	name?: string;
	className?: string;
	placeholder?: string;
	label?: string;
	onChange: () => void;
	disabled?: boolean;
	value?: string | number | string[];
}
interface TextareaState { }

export class Textarea extends React.Component<TextareaProps, TextareaState> {

  static defaultProps = {
    name: '',
    className: '',
    value: '',
    disabled: false,
  }

  renderLabel() {
    if (!this.props.label) {
      return null;
    }
    return (
      <label>{this.props.label}</label>
    );
  }

  renderTextarea() {
    return (
      <textarea
        className="form-control"
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        disabled={this.props.disabled}
      />
    );
  }

  render() {
    return (
      <div className={`form-group ${this.props.className}`}>
        {this.renderLabel()}
        {this.renderTextarea()}
      </div>
    );
  }
}
