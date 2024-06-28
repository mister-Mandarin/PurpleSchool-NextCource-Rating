'use client';
import {AllMenuItemsProps, FirstLevelMenuItem, PageItem} from '@/interfaces/menu.interface';
import Link from 'next/link';
import cn from 'classnames';
import styles from './MenuItems.module.css';
import {usePathname} from 'next/navigation';
import {firstLevelMenu} from '@/helpers/helpers';
import {DefaultStateProps} from '@/interfaces/store.interface';
import {SortEnum} from '@/components/Sort/Sort.props';
import {useState} from 'react';

const DEFAULT_STATE: DefaultStateProps = {
	firstCategory: -1,
	secondCategory: '',
	thirdCategory: '',
	sort: SortEnum.Rating
};

export default function MenuItems({allMenus}: AllMenuItemsProps) {

	const [storedValue, setValue] = useState(DEFAULT_STATE);
	const pathname = usePathname();


	function setOpenedCategory(level: 'firstCategory' | 'secondCategory' | 'thirdCategory', value: number | string) {
		const newValue: DefaultStateProps = { ...storedValue };

		if (level === 'firstCategory') {
			newValue[level] = value as number;
		} else {
			newValue[level] = value as string;
		}

		newValue.secondCategory = level === 'firstCategory' ? '' : newValue.secondCategory;
		newValue.thirdCategory = level === 'firstCategory' || level === 'secondCategory' ? '' : newValue.thirdCategory;
		setValue(newValue);
	}

	function buildFirstLevel() {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(menu => (
					<li key={menu.route}>
						<span className={cn(styles.firstLevel, {
							[styles.firstLevelActive]: menu.id === storedValue.firstCategory
						})}
								  onClick={() => setOpenedCategory('firstCategory', menu.id)}>
							{menu.icon}{menu.name}
						</span>
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
							onClick={() => setOpenedCategory('secondCategory', menu._id.secondCategory)}
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
						onClick={() => setOpenedCategory('thirdCategory', menu.alias)}
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