import {ReactNode} from 'react';
import styles from './Htag.module.css';
import cn from 'classnames';

interface ITitleProps {
    level?: 1 | 2 | 3;
    children: ReactNode;
    className?: string;
}

export default function Htag({level = 1, children, className}: ITitleProps) {
	const tagName: `h${typeof level}` = `h${level}`;
	const classStyle = styles[tagName] || '';
	const Component = tagName;

	return <Component className={cn(className, classStyle)}>{children}</Component>;
};