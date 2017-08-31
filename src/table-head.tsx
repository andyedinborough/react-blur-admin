import * as React from 'react';
import cx from './classNames';

interface TableHeadProps {
	blackMutedBackground?: boolean;
}
interface TableHeadState { }

export class TableHead extends React.Component<TableHeadProps, TableHeadState> {

  static defaultProps = {
    blackMutedBackground: true,
  }

  render() {
    const classes = cx({
      'black-muted-bg': this.props.blackMutedBackground,
    });

    return (
      <thead>
        <tr className={classes}>
          {this.props.children}
        </tr>
      </thead>
    );
  }
}
