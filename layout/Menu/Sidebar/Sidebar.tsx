import styles from './Sidebar.module.css';
import cn from 'classnames';
import {HTMLAttributes} from 'react';
import Logo from '../logo.svg';
import MenuItems from '@/layout/Menu/Sidebar/MenuItems/MenuItems';
import {getMenu} from '@/api/menu';
import Link from 'next/link';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
}

export default async function Sidebar({className, ...props}: SidebarProps) {

	async function getAllMenus() {
		const allMenus = [];
		for (let i = 0; i < 4; i++) {
			const menu = await getMenu(i);
			allMenus.push(menu);
		}
		return allMenus;
	}

	const allMenus = await getAllMenus();

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