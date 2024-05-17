import Logo from '../logo.svg';
import MenuItems from '@/layout/Menu/Sidebar/MenuItems/MenuItems';
import Link from 'next/link';
import {getAllMenus} from '@/helpers/helpers';
import {MenuItem} from '@/interfaces/menu.interface';

export default async function Sidebar({...props}) {

	const allMenus: MenuItem[][] = await getAllMenus();

	return (
		<div {...props}>
			<Link href={'/'}>
				<Logo/>
			</Link>
			<div>поиск</div>
			<MenuItems allMenus={allMenus}/>
		</div>
	);
};