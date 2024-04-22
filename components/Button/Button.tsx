import {ButtonHTMLAttributes, ReactNode} from 'react';
import cn from 'classnames';
import styles from './Button.module.css';
import ArrowImage from './Arrow.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    format: 'primary' | 'ghost';
    arrow?: 'right' | 'down' | 'none';
}

export default function Button({children, format, arrow = 'none', className, ...props}: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(styles.button, className, {
				[styles.ghost]: format == 'ghost',
				[styles.primary]: format == 'primary'
			})}>
			{children}
			<ArrowImage className={cn(styles.arrow, {
				[styles.down]: arrow == 'down'
			})}/>
		</button>
	);
}