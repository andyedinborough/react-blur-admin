import * as _ from 'lodash';
import * as React from 'react';

interface BreadcrumbsProps {
	className?: string;
}
interface BreadcrumbsState { }

export class Breadcrumbs extends React.Component<BreadcrumbsProps, BreadcrumbsState> {

  static defaultProps = {
    className: '',
  }

  renderBreadcrumbs() {
    let breadcrumbs = this.props.children;
    if (!_.isArray(breadcrumbs)) {
      breadcrumbs = [breadcrumbs];
    }
    return _.map(breadcrumbs, (breadcrumb, key) => {
      return (
        <li key={key}>{breadcrumb}</li>
      );
    });
  }

  render() {
    return (
      <ul className={`breadcrumb al-breadcrumb ${this.props.className}`}>
        {this.renderBreadcrumbs()}
      </ul>
    );
  }
}
