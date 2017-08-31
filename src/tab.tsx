import * as React from 'react';

interface TabProps {
	title?: string;
	onClick: () => void;
}

export const Tab: (props: TabProps) => JSX.Element = ({ title, onClick }) => {
  return (
    <a href='#' onClick={onClick}>{title}</a>
  );
};
