import styles from './page.module.css';
import Htag from '@/components/Htag/Htag';
import Button from '@/components/Button/Button';
import Tag from '@/components/Tag/Tag';
import Rating from '@/components/Rating/Rating';
import {API} from '@/app/api';
import {MenuItem} from '@/interfaces/menu.interface';

async function getMenu(firstCategory: number) {
	const response = await fetch(API.topPage.find, {
		method: 'POST',
		body: JSON.stringify({
			firstCategory
		}),
		headers: new Headers({'Content-Type': 'application/json'})
	});
	return response.json();
}

export default async function Home() {

	//const [rating, setRating] = useState(4);
	const menu = await getMenu(1);

	return (
		<main className={styles.main}>
			<div>{JSON.stringify(menu.length)}</div>
			<Htag level={1}>Hello!</Htag>
			<Htag level={2}>Hello!</Htag>
			<Htag level={3}>Hello!</Htag>
			<Button format='ghost' arrow='down'>Нажми на меня!</Button>
			<Button format='primary' arrow='right'>Нажми на меня! 2</Button>
			<Tag color='primary' size='m'>ыва вава</Tag>
			{/*<Rating rating={rating} isEdit={true} setRating={setRating}/>*/}
			<Rating rating={2} isEdit={true}/>
		</main>
	);
}
 