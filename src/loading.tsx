import * as React from 'react';

interface LoadingProps { }
interface LoadingState { }

export class Loading extends React.Component<LoadingProps, LoadingState> {
  render() {
    return (
      <i className='fa fa-spinner fa-spin' />
    );
  }
}
