import {ReactNode} from 'react';
import styles from './Htag.module.css';

interface ITitleProps {
    level?: 1 | 2 | 3;
    children: ReactNode;
}

export default function Htag({level = 1, children}: ITitleProps) {
	const tagName: `h${typeof level}` = `h${level}`;
	const className = styles[tagName] || '';
	const Component = tagName;

	return <Component className={className}>{children}</Component>;
};