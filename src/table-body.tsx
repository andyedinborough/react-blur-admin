import * as React from 'react';

interface TableBodyProps { }
interface TableBodyState { }

export class TableBody extends React.Component<TableBodyProps, TableBodyState> {
  render() {
    return (
      <tbody>
        {this.props.children}
      </tbody>
    );
  }
}
