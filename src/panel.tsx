import * as React from 'react';

interface PanelProps {
	title?: string;
	className?: string;
	size?: string;
	withScroll?: boolean;
}

interface PanelState { }

export class Panel extends React.Component<PanelProps, PanelState> {

  static defaultProps = {
    className: '',
    size: 'auto',
    withScroll: false,
  }

  renderHeader() {
    if (! this.props.title) {
      return null;
    }

    return (
      <div className='panel-heading clearfix'>
        <h3 className='panel-title'>
          {this.props.title}
        </h3>
      </div>
    );
  }

  renderPanelSize() {
    switch (this.props.size) {
    case 'xs':
    case 'extra-small':
      return 'xsmall-panel';

    case 'sm':
    case 'small':
      return 'small-panel';

    case 'md':
    case 'medium':
      return 'medium-panel';

    case 'lg':
    case 'large':
      return 'large-panel';

    case 'auto':
    case 'none':
    default:
      return '';
    }
  }

  render() {
    return (
      <div className={`panel panel-blur ${this.renderPanelSize()} light-text ${this.props.withScroll ? 'with-scroll' : ''} ${this.props.className}`}>
        {this.renderHeader()}
        <div className='panel-body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
