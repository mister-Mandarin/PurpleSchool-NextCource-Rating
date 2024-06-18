'use client';
import React, {useState} from 'react';
import styles from '@/Pages/ProductPage/ProductPage.module.css';
import Htag from '@/components/Htag/Htag';
import Tag from '@/components/Tag/Tag';
import Sort from '@/components/Sort/Sort';
import {SortEnum} from '@/components/Sort/Sort.props';
import {ProductModel} from '@/interfaces/product.interface';
import {TopPageModel} from '@/interfaces/page.interface';

interface DataProductProps {
	CurrentPageData: TopPageModel
	CurrentProductData: ProductModel[]
}
export default function DataProduct({CurrentPageData, CurrentProductData}: DataProductProps) {

	return (
		<>
			<div className={styles.title}>
				<Htag level={1}>{CurrentPageData.title}</Htag>
				{CurrentProductData && <Tag color='grayBlue' size='m'>{CurrentProductData.length}</Tag>}
				<Sort sort={SortEnum.Rating} />
			</div>
			<div>
				{CurrentProductData && CurrentProductData.map(p => <div key={p._id}>{p.title} {p.initialRating}</div>)}
			</div>
		</>
	);
};