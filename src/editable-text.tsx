import * as React from 'react';

interface EditableTextProps {
	onChange: (value?: string) => void;
	isOpen: boolean,
	onValidate: (value?: string) => boolean | string,
	value: string,
	hasError?: boolean;
	errorHelpLabel?: string;
	placeholder?: string;
	disabled?: boolean;
}
interface EditableTextState {
	dirtyValue?: string;
	isBeingEdited?: boolean;
}

export class EditableText extends React.Component<EditableTextProps, EditableTextState> {

  static defaultProps = {
    value: '',
    isOpen: false,
    hasError: false,
    errorHelpLabel: '',
    placeholder: 'No Value',
    disabled: false,
  }

  private _editInput: HTMLInputElement;

  constructor(props: EditableTextProps) {
    super(props);

    this.state = {
      dirtyValue: this.props.value,
      isBeingEdited: this.props.isOpen,
    };
  }

  componentWillReceiveProps(nextProps: EditableTextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ dirtyValue: nextProps.value, isBeingEdited: nextProps.isOpen });
    }
  }

  private onSetEditing = (isBeingEdited: boolean) => {
    if (this.props.disabled) {
      return false;
    }

    return this.setState({isBeingEdited}, () => {
      if (this.state.isBeingEdited) {
        this._editInput.focus();
      }
    });
  }

  private onCancelEditing = () => {
    this.setState({isBeingEdited: false, dirtyValue: this.props.value});
  }

  private onSubmit = () => {
    const validationResult = this.getValidationResult();
    if (validationResult === 'error') {
      return false;
    }

    return this.props.onChange(this.state.dirtyValue);
  }

  private onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return this.setState({dirtyValue: e.currentTarget.value});
  }

  private onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 27) { // esc
      return this.onCancelEditing();
    } else if (e.keyCode === 13) { // enter
      return this.onSubmit();
    }

    return e;
  }

  getValidationResult() {
    if (! this.props.onValidate) {
      return '';
    }

    const validationResult = this.props.onValidate(this.state.dirtyValue);
    if (validationResult === true || validationResult === 'success') {
      return 'success';
    } else if (validationResult === false || validationResult === 'error') {
      return 'error';
    } else if (validationResult === 'warning') {
      return 'warning';
    }

    return '';
  }

  getStatus(status?: string) {
    return status ? `has-${status}` : '';
  }

  renderErrorHelpLabel(status?: string) {
    if (! this.props.errorHelpLabel || status !== 'error') {
      return null;
    }

    return (
      <div className='editable-error help-block'>{this.props.errorHelpLabel}</div>
    );
  }

  render() {
    const status = this.getValidationResult(); // '', warning, success, error

    if (! this.state.isBeingEdited) {
      return (
        <span className={`editable editable-click ${this.props.disabled ? 'disabled' : ''}`} onClick={e => this.onSetEditing(true)}>
          {this.props.value || this.props.placeholder}
        </span>
      );
    }

    return (
      <form className='form-inline editable-wrap editable-text' role='form' onSubmit={e => e.preventDefault()}>
        <div className={`editable-controls form-group ${this.getStatus(status)}`}>
          <input
            type='text'
            value={this.state.dirtyValue}
            onChange={this.onTextChange}
            onKeyDown={this.onHandleKeyDown}
            ref={this.getEditInputRef}
            className='editable-has-buttons editable-input form-control'
					/>
          <span className='editable-buttons button-wrapper'>
            <button type='button' onClick={this.onSubmit} className='btn btn-primary btn-with-icon'>
              <i className='fa fa-check'></i>
            </button>
            <button type='button' onClick={this.onCancelEditing} className='btn btn-default btn-with-icon'>
              <i className='fa fa-close'></i>
            </button>
          </span>
          {this.renderErrorHelpLabel(status)}
        </div>
      </form>
    );
  }

  private getEditInputRef = (editInput: HTMLInputElement) => {
    this._editInput = editInput;
  }
}
