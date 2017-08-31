import * as React from 'react';

interface PreloaderProps { }
interface PreloaderState { }

export class Preloader extends React.Component<PreloaderProps, PreloaderState> {
  render() {
    return (
      <div className='preloader-component-container'>
        <div className="preloader-component">
          <div>
          </div>
        </div>
      </div>
    );
  }
}
