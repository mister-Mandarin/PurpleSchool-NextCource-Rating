'use client';
import {useReducer, useState} from 'react';
import styles from '@/Pages/ProductPage/ProductPage.module.css';
import Htag from '@/components/Htag/Htag';
import Tag from '@/components/Tag/Tag';
import Sort from '@/components/Sort/Sort';
import {SortEnum} from '@/components/Sort/Sort.props';
import {ProductModel} from '@/interfaces/product.interface';
import {TopPageModel} from '@/interfaces/page.interface';
import {sortReducer, SortReducerState} from '@/components/DataProduct/sord.reducer';

interface DataProductProps {
	CurrentPageData: TopPageModel
	CurrentProductData: ProductModel[]
}
export default function DataProduct({CurrentPageData, CurrentProductData}: DataProductProps) {

	const initialState = { products: CurrentProductData, sort: SortEnum.Rating };
	const [state, dispatch] = useReducer(sortReducer, initialState);

	function setSort(sort: SortEnum) {
		dispatch({type: sort});
	}

	return (
		<>
			<div className={styles.title}>
				<Htag level={1}>{CurrentPageData.title}</Htag>
				{CurrentProductData && <Tag color='grayBlue' size='m'>{CurrentProductData.length}</Tag>}
				<Sort sort={state.sort} setSort={setSort}/>
			</div>
			<div>
				{state.products.map(p => <div key={p._id}>{p.title} {p.initialRating}</div>)}
			</div>
		</>
	);
};