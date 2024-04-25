import styles from './Sidebar.module.css';
import cn from 'classnames';
import {HTMLAttributes} from 'react';
import Logo from '../logo.svg';
import MenuItems from '@/layout/Menu/Sidebar/MenuItems/MenuItems';
import {getMenu} from '@/api/menu';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
}

export default async function Sidebar({className, ...props}: SidebarProps) {
	const secondMenu = await getMenu(0);

	return (
		<div {...props} className={cn(className, styles.sidebar)}>
			<Logo className={styles.logo} />
			{/*<Search />*/}
			<div>поиск</div>
			<MenuItems secondMenu={secondMenu}/>
		</div>
	);
};