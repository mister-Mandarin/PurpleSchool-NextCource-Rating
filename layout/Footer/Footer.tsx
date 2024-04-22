import styles from './Footer.module.css';
import cn from 'classnames';
import {HTMLAttributes} from 'react';

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
}

export default function Footer({className, ...props}: FooterProps) {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>
                OwlTop &copy; 2020 - {new Date().getFullYear()} Все права защищены
			</div>
			<a href="#" target="_blank">Пользовательское соглашение</a>
			<a href="#" target="_blank">Политика конфиденциальности</a>
		</footer>
	);
};