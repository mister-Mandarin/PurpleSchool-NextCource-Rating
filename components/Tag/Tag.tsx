import styles from './Tag.module.css';
import cn from 'classnames';
import {HTMLAttributes, ReactNode} from 'react';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    size?: 's' | 'm';
    children: ReactNode;
    color?: 'ghost' | 'red' | 'grey' | 'green' | 'primary';
    href?: string;
}

export default function Tag({size = 's', children, color = 'ghost', href, className, ...props}: TagProps) {
	return (
		<div
			className={cn(styles.tag, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'm',
				[styles.ghost]: color == 'ghost',
				[styles.red]: color == 'red',
				[styles.grey]: color == 'grey',
				[styles.green]: color == 'green',
				[styles.primary]: color == 'primary'
			})}
			{...props}
		>
			{href ? <a href={href}>{children}</a>
				: <>{children}</>
			}
		</div>
	);
};