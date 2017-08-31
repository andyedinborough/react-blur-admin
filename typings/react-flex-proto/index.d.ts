import * as React from 'react';

interface ColProps {
  grow: boolean;
  shrink: boolean;
  basis: string;
  padding: string | number;
  align: string;
}

declare class Col extends React.Component<ColProps, void> {

}

interface RowProps {
  align: string;
}

declare class Row extends React.Component<RowProps, void> {

}
