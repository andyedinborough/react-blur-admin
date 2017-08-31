import * as React from 'react';

import {Input} from './input';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onChange: (page: number) => void;
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

  private onSetEditing = (isBeingEdited: boolean) => {
    this.setState({ isBeingEdited });
  }

  private onPageChange = (page?: string | number | boolean) => {
    if (typeof page === 'number' && this.isValidPage(page)) {
      this.props.onChange(page);
    }
  }

  private onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 27) {
      this.onCancelEditing();
    } else if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  private onCancelEditing = () => {
    this.setState({isBeingEdited: false, dirtyValue: this.props.currentPage});
  }

  private onSubmit = () => {
    if (this.isValidPage(this.state.dirtyValue)) {
      this.props.onChange(Number(this.state.dirtyValue));
    }
  }

  private onTextChange = (value?: string | number | boolean) => {
    this.setState({ dirtyValue: parseFloat(String(value)) || 0 });
  }

  isValidPage(page: string | number | boolean | undefined) {
    return typeof page === 'number' && page >= 1 && page <= this.props.totalPages;
  }

  renderCurrentPage() {
    const {currentPage, totalPages} = this.props;
    if (! this.state.isBeingEdited) {
      return <a>{currentPage} of {totalPages}</a>;
    }

    return (
      <span style={{height: '34px'}}>
        <Input
          autoFocus={true}
          hasFeedbackIcon={false}
          className='pagination-input'
          onValidate={this.isValidPage}
          value={String(this.state.dirtyValue)}
          onChange={this.onTextChange}
          onKeyDown={this.onHandleKeyDown}
        />
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
