import styles from './Sidebar.module.css';
import cn from 'classnames';
import {HTMLAttributes} from 'react';
import Logo from '../logo.svg';
import MenuItems from '@/layout/Menu/Sidebar/MenuItems/MenuItems';
import {getMenu} from '@/api/menu';
import Link from 'next/link';
import {getAllMenus} from '@/helpers/helpers';
import {AllMenuItemsProps, MenuItem} from '@/interfaces/menu.interface';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
}

export default async function Sidebar({className, ...props}: SidebarProps) {

	const allMenus: MenuItem[][] = await getAllMenus();

	return (
		<div {...props} className={cn(className, styles.sidebar)}>
			<Link href={'/'} className={styles.logo}>
				<Logo/>
			</Link>
			{/*<Search />*/}
			<div>поиск</div>
			<MenuItems allMenus={allMenus}/>
		</div>
	);
};