import styles from './Card.module.css';
import cn from 'classnames';
import {ReactNode} from 'react';

export interface CardProps {
    color?: 'white' | 'blue';
    children: ReactNode;
    className?: string;
}

export const Card = ({ color = 'white', children, className, ...props }: CardProps) => {
	return (
		<div className={cn(styles.card, className, {
			[styles.blue]: color == 'blue'
		})}
		{...props}>
			{children}
		</div>
	);
};