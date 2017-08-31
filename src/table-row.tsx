import * as React from 'react';
import cx from './classNames';

interface TableRowProps {
	noTopBorder?: boolean;
}
interface TableRowState { }

export class TableRow extends React.Component<TableRowProps, TableRowState> {

  static defaultProps = {
    noTopBorder: true,
  }

  render() {
    const classes = cx({
      'no-top-border': this.props.noTopBorder,
    });

    // black-muted-background
    return (
      <tr className={classes}>
        {this.props.children}
      </tr>
    );
  }
}
