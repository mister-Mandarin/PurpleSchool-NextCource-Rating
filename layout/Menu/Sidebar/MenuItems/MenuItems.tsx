'use client';
import {AllMenuItemsProps, FirstLevelMenuItem, PageItem} from '@/interfaces/menu.interface';
import Link from 'next/link';
import cn from 'classnames';
import styles from './MenuItems.module.css';
import {useLocalStorage} from '@/hooks/useLocalStorage';
import {usePathname} from 'next/navigation';
import {firstLevelMenu} from '@/helpers/helpers';


export default function MenuItems({allMenus}: AllMenuItemsProps) {

	const {storedValue, setValue} = useLocalStorage('store');
	const pathname = usePathname();

	function setOpenedFirstLvl(value: number) {
		const newValue = {
			firstCategory: value,
			secondCategory: '',
			thirdCategory: ''
		};

		setValue({
			...storedValue, ...newValue
		});
	}

	function setOpenedSecondLvl(value: string) {
		const newValue = {
			firstCategory: storedValue.firstCategory,
			secondCategory: value,
			thirdCategory: ''
		};

		setValue({
			...storedValue, ...newValue
		});
	}

	function setOpenedThirdLvl(value: string) {
		const newValue = {
			firstCategory: storedValue.firstCategory,
			secondCategory: storedValue.secondCategory,
			thirdCategory: value
		};

		setValue({
			...storedValue, ...newValue
		});
	}

	function buildFirstLevel() {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(menu => (
					<li key={menu.route}>
						<button className={cn(styles.firstLevel, {
							[styles.firstLevelActive]: menu.id == storedValue.firstCategory
						})}
						onClick={() => setOpenedFirstLvl(menu.id)}>
							{menu.icon}
							<span>{menu.name}</span>
						</button>
						{menu.id == storedValue.firstCategory && buildSecondLevel(menu)}
					</li>
				))}
			</ul>
		);
	}

	function buildSecondLevel(menuFromFirstLvl: FirstLevelMenuItem) {

		if (allMenus[storedValue.firstCategory].length === 0) {
			return (
				<ul className={styles.secondBlock}>
					<li className={styles.secondLevel}>
                        Нет данных
					</li>
				</ul>
			);
		}

		return (
			<ul className={styles.secondBlock}>
				{allMenus[storedValue.firstCategory].map(menu => (
					<li key={menu._id.secondCategory}>
						<button className={styles.secondLevel}
							onClick={() => setOpenedSecondLvl(menu._id.secondCategory)}
						>
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
						})}
						onClick={() => setOpenedThirdLvl(menu.alias)}
					>
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