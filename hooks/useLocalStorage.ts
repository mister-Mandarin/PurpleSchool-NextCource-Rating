'use client';

import {useEffect, useState} from 'react';
import {DefaultStateProps} from '@/interfaces/store.interface';

const DEFAULT_STATE: DefaultStateProps = {
	firstCategory: 0,
	secondCategory: 'Аналитика',
	thirdCategory: 'financial-analytics'
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
			// Client-side-only code
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

	return {storedValue, setValue};
};