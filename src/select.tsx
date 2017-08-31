import * as _ from 'lodash';
import * as React from 'react';

export type ValueType = string | number;
export type SearchDelegate = (searchValue: string, options: SelectOption[]) => SelectOption[];

export interface SelectOption {
	value: ValueType;
	label?: string;
}

interface SelectProps {
  className?: string;
	placeholder?: string;
	maxHeight?: string;
	onChange?: (value: ValueType) => void;
	onRenderValue?: (value: ValueType) => ValueType;
	options?: SelectOption[],
	value?: ValueType;
	isSearchable?: boolean;
	isOpen?: boolean;
	onSearch?: SearchDelegate;
	onToggleOpen?: (isOpen: boolean) => void; // used when the parent needs to know that isOpen was toggled
}
interface SelectState {
  isOpen?: boolean;
  visibleOptions: SelectOption[],
  activeIndex: number;
  value?: ValueType;
  searchValue?: string;
}

export class Select extends React.Component<SelectProps, SelectState> {

  static defaultProps = {
    placeholder: '',
    onChange: _.noop,
    value: '',
    isSearchable: false,
    isOpen: false,
  }

  private _selectSearch: HTMLElement;

  constructor(props: SelectProps) {
    super(props);

    this.state = {
      value: this.getValue(),
      activeIndex: 0,
      isOpen: props.isOpen,
      searchValue: '',
      visibleOptions: props.options || [],
    };
  }

  componentDidMount() {
    this.onFocus();
  }

  componentWillReceiveProps(nextProps: SelectProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({isOpen: nextProps.isOpen}, this.onFocus);
    }

    if (nextProps.options && nextProps.options !== this.props.options) {
      this.setState({visibleOptions: nextProps.options, searchValue: ''});
    }

    if (this.props.value && ! nextProps.value) {
      this.setState({activeIndex: 0, value: this.getValue(nextProps)});
    }

    this.setState({value: this.getValue(nextProps)});
  }

  private onFocus = () => {
    if (this.state.isOpen && this.props.isSearchable) {
      this._selectSearch.focus();
    }
  }

  private onToggleOpen = () => {
    const { onToggleOpen } = this.props;
    if (onToggleOpen) {
      onToggleOpen(! this.state.isOpen);
    }
    this.setState({ isOpen: ! this.state.isOpen }, this.onFocus);
  }

  private onSetActiveIndex = (value: number) => {
    this.setState({activeIndex: value, isOpen: true}, this.onFocus);
  }

  private onSelectValue = (selectedValue: ValueType) => {
    const selectedOpt = _.find(this.props.options, { value: selectedValue });
    const value = selectedOpt && selectedOpt.label ? selectedOpt.label : this.props.placeholder;
    this.setState({ isOpen: false, value });
    const { onChange } = this.props;
    if(onChange) {
      onChange(selectedValue);
    }
  }

  private onTextSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let visibleOptions;
    const searchValue = event.currentTarget.value;

    // Used if the developer needs custom search functionality.
    if (this.props.onSearch && this.props.options) {
      visibleOptions = this.props.onSearch(searchValue, this.props.options);
    } else {
      visibleOptions = this.getVisibleOptions(event.currentTarget.value) || [];
    }

    this.setState({ searchValue, visibleOptions });
  }

  private onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 27) { // esc
      return this.onToggleOpen();
    } else if (e.keyCode === 13) { // enter
      e.preventDefault(); // prevent the onClick event from firing also, which could reopen select options
      const selectedOption = _.find(this.state.visibleOptions, (option, index) => {
        return index === this.state.activeIndex;
      });

      if (selectedOption) {
        return this.onSelectValue(selectedOption.value);
      }
    } else if (e.keyCode === 40) { // down
      e.preventDefault(); // prevent browser scrolling
      let activeIndex = (this.state.activeIndex || 0) + 1;
      if (activeIndex >= this.state.visibleOptions.length) {
        activeIndex = this.state.visibleOptions.length - 1; // - 1 because the index starts at 0
      }

      return this.onSetActiveIndex(activeIndex);
    } else if (e.keyCode === 38) { // up
      e.preventDefault(); // prevent browser scrolling
      let activeIndex = this.state.activeIndex - 1;
      if (activeIndex < 0) {
        activeIndex = 0;
      }

      return this.onSetActiveIndex(activeIndex);
    }

    return e;
  }

  getValue(props = this.props) {
    if (props.value && props.onRenderValue) {
      return props.onRenderValue(props.value);
    }

    const option = _.find(props.options, {value: props.value});
    return option && option.label || props.placeholder;
  }

  getVisibleOptions(searchValue: string) {
    if (! searchValue) {
      return this.props.options;
    }

    return _.filter(this.props.options, option => {
      return option.label && option.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });
  }

  isOpen() {
    return this.state.isOpen ? 'open' : '';
  }

  renderValue() {
    return (
      <span className='filter-option pull-left'>
        {this.state.value}
      </span>
    );
  }

  renderSearch() {
    if (! this.props.isSearchable) {
      return null;
    }

    return (
      <div className='bs-searchbox'>
        <input
          ref={this.getSelectSearchRef}
          type='text'
          className='form-control'
          value={this.state.searchValue}
          onKeyDown={this.onHandleKeyDown}
          onChange={this.onTextSearch} />
      </div>
    );
  }

  renderOption(option: SelectOption, index: number, isSelected: string, isActive: string) {
    return (
      <li
        key={index}
        className={`${isSelected} ${isActive}`}
        onClick={e => this.onSelectValue(option.value)}
        onMouseOver={e => this.onSetActiveIndex(index)}>
        <a tabIndex={index}>
          <i className={isSelected ? 'fa fa-check' : ''} /> <span className='text'>{option.label}</span>
        </a>
      </li>
    );
  }

  renderOptions() {
    if (! this.props.options) {
      return null;
    }

    let options = _.map(this.state.visibleOptions, (option, index) => {
      const isSelected = this.props.value === option.value ? 'selected' : '';
      const isActive = this.state.activeIndex === index ? 'active' : '';

      return this.renderOption(option, index, isSelected, isActive);
    });

    let style = {};
    if (this.props.maxHeight) {
      style = {
        maxHeight: this.props.maxHeight,
        overflow: 'auto',
      };
    }

    return (
      <ul style={style} className='dropdown-menu inner'>
        {options}
      </ul>
    );
  }

  render() {
    return (
      <div className='form-group'>
        <div className={`btn-group bootstrap-select form-control ${this.isOpen()}`}>
          <button
            type="button"
            className='btn dropdown-toggle btn-default'
            onClick={this.onToggleOpen}
            onKeyDown={this.onHandleKeyDown}>
            {this.renderValue()}
            <span className='bs-caret'>
              <span className='caret' />
            </span>
          </button>
          <div className='dropdown-menu open'>
            {this.renderSearch()}
            {this.renderOptions()}
          </div>
        </div>
      </div>
    );
  }

  private getSelectSearchRef = (selectSearch: HTMLInputElement) => {
    this._selectSearch = selectSearch;
  }
}
