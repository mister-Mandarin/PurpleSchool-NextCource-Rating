'use client';
import {FirstLevelMenuItem, MenuItem, PageItem} from '@/interfaces/menu.interface';
import {TopLevelCategory} from '@/interfaces/page.interface';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/books.svg';
import Link from 'next/link';
import cn from 'classnames';
import styles from './MenuItems.module.css';
import {useLocalStorage} from '@/hooks/useLocalStorage';
import {usePathname, useRouter} from 'next/navigation';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products }
];


interface MenuItemsProps {
	secondMenu: MenuItem[];
}

export default function MenuItems({secondMenu}: MenuItemsProps, {params}: { params: { alias: string } }){
	//const secondMenu = await getMenu(firstCategory);
	//const secondMenuItems = secondMenu;
	const {storedValue} = useLocalStorage('store');
	const firstCategory: number = Number(storedValue.firstCategory);
	const pathname = usePathname();

	function buildFirstLevel () {
		console.log('pathname ', pathname);
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(menu => (
					<li key={menu.route}>
						<Link href={`${menu.route}`} className={cn(styles.firstLevel, {
							[styles.firstLevelActive]: menu.id == firstCategory
						})}>
							{menu.icon}
							<span>{menu.name}</span>
						</Link>
						{menu.id == firstCategory && buildSecondLevel(menu)}
					</li>
				))}
			</ul> 
		);
	}
	
	function buildSecondLevel(menuFromFirstLvl: FirstLevelMenuItem) {
		return (
			<ul className={styles.secondBlock}>
				{secondMenu.map(menu => (
					<li key={menu._id.secondCategory}>
						<button className={styles.secondLevel}>
							<div className={styles.secondLevelBlock}>
								{menu._id.secondCategory}
							</div>
						</button>
						{buildThirdLevel(menu.pages, menuFromFirstLvl.route)}
					</li>
				))}
			</ul>
		);
	}

	function buildThirdLevel(menuFromSecondLvl: PageItem[], menuFromFirstLvl: string) {
		return (
			<div>
				{menuFromSecondLvl.map(menu => (
					<Link key={menu._id} href={`${menu.alias}`}
						  className={cn(styles.thirdLevel, {
							  // tuta [styles.thirdLevelActive]: menu.alias == pathname
						  })}>
						{menu.title}<br />
					</Link>
				))}
			</div>
		);
	}

	return (
		<nav className={styles.menu}>
			{buildFirstLevel()}
		</nav>
	);
}