import * as React from 'react';

import {Input} from './input';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onChange: () => void;
}
interface PaginationState {
	isBeingEdited?: boolean;
	dirtyValue?: number;
}

export class Pagination extends React.Component<PaginationProps, PaginationState> {

  constructor(props: PaginationProps) {
    super(props);

    this.state = {
      dirtyValue: this.props.currentPage,
      isBeingEdited: false,
    };
  }

  componentWillReceiveProps(nextProps: PaginationProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({ dirtyValue: nextProps.currentPage, isBeingEdited: false });
    }
  }

  onSetEditing(isBeingEdited: boolean) {
    this.setState({ isBeingEdited });
  }

  onPageChange(page) {
    if (this.isValidPage(page)) {
      this.props.onChange(page);
    }
  }

  onHandleKeyDown(e) {
    if (e.keyCode === 27) {
      return this.onCancelEditing();
    } else if (e.keyCode === 13) {
      return this.onSubmit();
    }

    return e;
  }

  onCancelEditing() {
    this.setState({isBeingEdited: false, dirtyValue: this.props.currentPage});
  }

  onSubmit() {
    if (this.isValidPage(this.state.dirtyValue)) {
      this.props.onChange(Number(this.state.dirtyValue));
    }
  }

  onTextChange(event) {
    this.setState({ dirtyValue: event.currentTarget.value });
  }

  isValidPage(page) {
    return page >= 1 && page <= this.props.totalPages;
  }

  renderCurrentPage() {
    const {currentPage, totalPages} = this.props;
    if (! this.state.isBeingEdited) {
      return <a>{currentPage} of {totalPages}</a>;
    }

    return (
      <span style={{height: '34px'}}>
        <Input
          ref='pagination-input'
          autoFocus={true}
          hasFeedbackIcon={false}
          className='pagination-input'
          onValidate={page => this.isValidPage(page)}
          value={this.state.dirtyValue}
          onChange={this.onTextChange}
          onKeyDown={this.onHandleKeyDown} />
      </span>
    );
  }

  renderPages() {
    const {currentPage, totalPages} = this.props;

    return [
      <li key='first-page' onClick={e => this.onPageChange(1)}>
        <a>
          <i className='fa fa-angle-double-left vcenter'></i>
        </a>
      </li>,
      <li key={currentPage - 1} onClick={e => this.onPageChange(currentPage - 1)}>
        <a>
          <i className='fa fa-angle-left'></i>
        </a>
      </li>,
      <li key={currentPage} onClick={e => this.onSetEditing(true)}>
        {this.renderCurrentPage()}
      </li>,
      <li key={currentPage + 1} onClick={e => this.onPageChange(currentPage + 1)}>
        <a>
          <i className='fa fa-angle-right'></i>
        </a>
      </li>,
      <li key='last-page' onClick={e => this.onPageChange(totalPages)}>
        <a>
          <i className='fa fa-angle-double-right'></i>
        </a>
      </li>,
    ];
  }

  render() {
    if (this.props.totalPages < 1) {
      return null;
    }

    return (
      <ul className='pagination'>
        {this.renderPages()}
      </ul>
    );
  }
}
