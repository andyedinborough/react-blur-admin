declare module 'react-flex-proto' {
  import * as React from 'react';

  interface ColProps {
    grow?: boolean;
    shrink?: boolean;
    basis?: string;
    padding?: string | number;
    align?: string;
  }

  export class Col extends React.Component<ColProps, {}> {

  }

  interface RowProps {
    align?: string;
  }

  export class Row extends React.Component<RowProps, {}> {

  }
}
