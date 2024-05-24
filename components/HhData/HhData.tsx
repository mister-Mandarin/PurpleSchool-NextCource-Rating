import styles from './HhData.module.css';
import React from 'react';
import RateIcon from './rate.svg';
import {priceRuIntl} from '@/helpers/helpers';
import {HhDataProps} from '@/interfaces/page.interface';
import {Card} from '@/components/Card/Card';

export default function HhData({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps) {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>Всего вакансий</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Начальный</div>
					<div className={styles.salaryValue}>{priceRuIntl(juniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled}/>
						<RateIcon/>
						<RateIcon/>
					</div>
				</div>
				<div>
					<div className={styles.title}>Средний</div>
					<div className={styles.salaryValue}>{priceRuIntl(middleSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled}/>
						<RateIcon className={styles.filled}/>
						<RateIcon/>
					</div>
				</div>
				<div>
					<div className={styles.title}>Профессионал</div>
					<div className={styles.salaryValue}>{priceRuIntl(seniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled}/>
						<RateIcon className={styles.filled}/>
						<RateIcon className={styles.filled}/>
					</div>
				</div>
			</Card>
		</div>
	);
};