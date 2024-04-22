import styles from './Paragraph.module.css.module.css';
import cn from 'classnames';
import {DetailedHTMLProps, HTMLAttributes, ParamHTMLAttributes, ReactNode} from 'react';

interface PProps extends ParamHTMLAttributes<HTMLParagraphElement> {
    size?: 's' | 'm' | 'l';
    children: ReactNode;
}

export default function Paragraph({size = 'm', children, className, ...props}: PProps) {
	return (
		<p
			className={cn(styles.p, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'm',
				[styles.l]: size == 'l'
			})}
			{...props}
		>
			{children}
		</p>
	);
};