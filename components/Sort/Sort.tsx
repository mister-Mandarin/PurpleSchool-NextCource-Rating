'use client';
import SortIcon from './sort.svg';
import cn from 'classnames';
import styles from './Sort.module.css';
import {SortEnum, SortProps} from '@/components/Sort/Sort.props';
import {useState} from 'react';


export default function Sort({sort, ...props}: SortProps) {

	const [sort, setSort] = useState(SortEnum.Rating);

	return (
		<div className={styles.sort} {...props}>
			<div className={styles.sortName} id="sort">Сортировка</div>
			<button
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}
			>
				<SortIcon className={styles.sortIcon} />По рейтингу
			</button>
			<button
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
			>
				<SortIcon className={styles.sortIcon} />По цене
			</button>
		</div>
	);
};