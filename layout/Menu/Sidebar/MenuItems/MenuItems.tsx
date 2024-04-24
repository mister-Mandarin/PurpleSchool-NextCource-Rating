import {getMenu} from '@/api/menu';
import {FirstLevelMenuItem} from '@/interfaces/menu.interface';
import {TopLevelCategory} from '@/interfaces/page.interface';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/books.svg';
import Link from 'next/link';
import cn from 'classnames';
import styles from './MenuItems.module.css';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products }
];

export default async function MenuItems(){
	const menuFirst = await getMenu(0);

	function buildFirstLevel () {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(menu => (
					<li key={menu.route}>
						<Link href={`${menu.route}`}>
							<div className={cn(styles.firstLevel, {
								// [styles.firstLevelActive]: m.id == firstCategory
							})}>
								{menu.icon}
								<span>{menu.name}</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		);
	}
	
	function buildSecondLevel() {
		return (
			<ul className={styles.secondBlock}>

			</ul>
		);
	}

	return (
		<nav className={styles.menu} role='navigation'>
			{buildFirstLevel()}
			{/*<ul>*/}
			{/*	{menu.map(menu => <li key={menu._id.secondCategory}>{menu._id.secondCategory}</li>)}*/}
			{/*</ul>*/}

		</nav>
	);
}