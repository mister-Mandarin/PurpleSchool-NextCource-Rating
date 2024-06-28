'use client';

import {useEffect, useState} from 'react';
import {DefaultStateProps} from '@/interfaces/store.interface';
import {SortEnum} from '@/components/Sort/Sort.props';

// const DEFAULT_STATE: DefaultStateProps = {
// 	firstCategory: 0,
// 	secondCategory: 'Аналитика',
// 	thirdCategory: 'financial-analytics',
// 	sort: SortEnum.Rating
// };
const DEFAULT_STATE: DefaultStateProps = {
	firstCategory: -1,
	secondCategory: '',
	thirdCategory: '',
	sort: SortEnum.Rating
};

export const useLocalStorage = (key: string) => {
	const [storedValue, setStoredValue] = useState<DefaultStateProps>(
		() => {
			return getValue() || DEFAULT_STATE;
		}
	);

	useEffect(() => {
		setValue(getValue());
	}, [key]);

	function getValue() {
		if (typeof window !== 'undefined') {
			const item = localStorage.getItem(key) ;
			if (!item)  {
				localStorage.setItem(key, JSON.stringify(DEFAULT_STATE));
				getValue();
				return;
			}
			return item ? JSON.parse(item) : DEFAULT_STATE;
		}
	};

	const setValue = (value: DefaultStateProps) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);

			localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return {storedValue, setValue, getValue};
};