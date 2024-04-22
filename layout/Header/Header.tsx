import styles from './Header.module.css';
import cn from 'classnames';
import {HTMLAttributes} from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
}

export default function Header({className, ...props}: HeaderProps) {
	return (
		<div {...props} className={cn(className)}>header</div>
	);
}; 