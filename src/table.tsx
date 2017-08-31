import * as React from 'react';
import cx from './classNames';

interface TableProps {
	hover?: boolean;
	border?: boolean;
	condense?: boolean;
	stripe?: boolean;
	responsive?: boolean;
	style: React.StyleHTMLAttributes<HTMLTableElement>;
}
interface TableState { }

export class Table extends React.Component<TableProps, TableState> {

  static defaultProps = {
    responsive: true,
    hover: true,
    stripe: false,
    condense: false,
    border: false,
  }

  render() {
    const classes = cx({
      table: true,
      'table-hover': this.props.hover,
      'table-bordered': this.props.border,
      'table-condensed': this.props.condense,
      'table-striped': this.props.stripe,
    });

    return (
      <div className={this.props.responsive ? 'table-responsive' : ''}>
        <table className={classes} style={this.props.style}>
          {this.props.children}
        </table>
      </div>
    );
  }
}
