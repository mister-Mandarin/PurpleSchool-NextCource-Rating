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
	{route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
	{route: 'services', name: 'Сервисы', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
	{route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
	{route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products}
];


interface MenuItemsProps {
    allMenus: [MenuItem[]];
}

export default function MenuItems({allMenus}: MenuItemsProps) {

	const {storedValue} = useLocalStorage('store');
	const firstCategory: number = Number(storedValue.firstCategory);
	const pathname = usePathname();

	function buildFirstLevel() {
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
				{allMenus[firstCategory].map(menu => (
					<li key={menu._id.secondCategory}>
						<button className={styles.secondLevel}>
							{menu._id.secondCategory}
						</button>
						<div className={cn(styles.secondLevelBlock, {
							[styles.secondLevelBlockOpened]: menu._id.secondCategory == storedValue.secondCategory
						})}>
							{buildThirdLevel(menu.pages, menuFromFirstLvl.route)}
						</div>
					</li>
				))}
			</ul>
		);
	}

	function buildThirdLevel(menuFromSecondLvl: PageItem[], menuFromFirstLvl: string) {
		return (
			<>
				{menuFromSecondLvl.map(menu => (
					<Link
						key={menu._id}
						href={`/${menuFromFirstLvl}/${menu.alias}`}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${menuFromFirstLvl}/${menu.alias}` == pathname
						})}>
						{menu.title}
					</Link>
				))}
			</>
		);
	}

	return (
		<nav className={styles.menu}>
			{buildFirstLevel()}
		</nav>
	);
}