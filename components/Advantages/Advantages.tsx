import {TopPageAdvantage} from '@/interfaces/page.interface';
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';

export interface AdvantagesProps {
    advantages: TopPageAdvantage[]
}

export default function Advantages({advantages}: AdvantagesProps) {
	return (
		<>
			{advantages.map(a => (
				<div key={a._id} className={styles.advantage}>
					<CheckIcon/>
					<div className={styles.title}>{a.title}</div>
					{a.description.length > 0 &&
						<>
							<hr className={styles.vLine}/>
							<div>{a.description}</div>
						</>
					}
				</div>
			))}
		</>
	);
}
