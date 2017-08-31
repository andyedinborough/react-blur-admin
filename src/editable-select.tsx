import * as _ from 'lodash';
import * as React from 'react';

import { Select, SelectOption, SearchDelegate } from './select';

interface EditableSelectProps {
	onChange: (value: {}) => void;
	value?: string | number;
	placeholder?: string;
	maxHeight?: string;
	options: SelectOption[];
	onSearch?: SearchDelegate;
	onRenderValue?: (value: string | number) => string | number;
	disabled?: boolean;
	isBeingEdited?: boolean;
}
interface EditableSelectState {
	isBeingEdited?: boolean;
}

export class EditableSelect extends React.Component<EditableSelectProps, EditableSelectState> {

  static defaultProps = {
    value: '',
    placeholder: 'No Value',
  }

  constructor(props: EditableSelectProps) {
    super(props);
    this.state = {
      isBeingEdited: this.props.isBeingEdited || false,
    };
  }

  componentWillReceiveProps(nextProps: EditableSelectProps) {
    if (nextProps.value !== this.props.value && ! nextProps.hasOwnProperty('isBeingEdited')) {
      this.setState({isBeingEdited: false});
    } else if (nextProps.isBeingEdited !== this.props.isBeingEdited) {
      this.setState({isBeingEdited: nextProps.isBeingEdited});
    }
  }

  private onSetEditing = (isBeingEdited: boolean) => {
    if (this.props.disabled) {
      return false;
    }

    return this.setState({isBeingEdited});
  }

  private onChange = (value: {}) => {
    this.setState({isBeingEdited: false});
    this.props.onChange(value);
  }

  renderValue(option: SelectOption) {
    if (this.props.value && this.props.onRenderValue) { // User can format the value how they want it
      return this.props.onRenderValue(this.props.value);
    } else if (option && option.label) { // Otherwise display the label
      return option.label;
    }

    return this.props.placeholder;
  }

  render() {
    if (! this.state.isBeingEdited) {
      const option = _.find(this.props.options, {value: this.props.value});
      return option && (
        <span className={`editable editable-click ${this.props.disabled ? 'disabled' : ''}`} onClick={e => this.onSetEditing(true)}>
          {this.renderValue(option)}
        </span>
      ) || null;
    }

    return (
      <form className='form-inline editable-wrap editable-text' role='form' onSubmit={e => e.preventDefault()}>
        <div className='editable-controls form-group'>
          <Select
            isOpen={true}
            {...this.props}
            onChange={this.onChange}
            onToggleOpen={isOpen => this.onSetEditing(isOpen)}
            className="editable-has-buttons editable-input"
          />
        </div>
      </form>
    );
  }
}
