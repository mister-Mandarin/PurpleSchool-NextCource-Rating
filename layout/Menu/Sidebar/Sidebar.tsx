import styles from './Sidebar.module.css';
import cn from 'classnames';
import {HTMLAttributes} from 'react';
import Logo from '../logo.svg';
import MenuItems from '@/layout/Menu/Sidebar/MenuItems/MenuItems';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
}

export default function Sidebar({className, ...props}: SidebarProps) {
	return (
		<div {...props} className={cn(className, styles.sidebar)}>
			<Logo className={styles.logo} />
			{/*<Search />*/}
			<div>поиск</div>
			<MenuItems />
		</div>
	);
};