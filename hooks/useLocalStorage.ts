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
		DEFAULT_STATE
	);

	const getValue = () => {
		try {
			const item = window.localStorage.getItem(key) ;
			return item ? JSON.parse(item) : DEFAULT_STATE;
		} catch (error) {
			console.error(error);
			return DEFAULT_STATE;
		}
	};

	const setValue = (value: DefaultStateProps) => {
		try {
			const valueToStore =
                value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			//console.log('valueToStore', valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setValue(getValue());
	}, [key]);

	return {storedValue, setValue};
};