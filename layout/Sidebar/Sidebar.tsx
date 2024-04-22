import styles from './Sidebar.module.css';
import cn from 'classnames';
import {HTMLAttributes} from 'react';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
}

export default function Sidebar({className, ...props}: SidebarProps) {
	return (
		<div {...props} className={cn(className)}>sidebar</div>
	);
};