import styles from './page.module.css';
import Htag from '@/components/Htag/Htag';
import Button from '@/components/Button/Button';
import Tag from '@/components/Tag/Tag';
import Rating from '@/components/Rating/Rating';
import {getMenu} from '@/api/menu';
  
export default async function Home() {

	//const [rating, setRating] = useState(4);

	// const menu = JSON.stringify(res);
	return (
		<main className={styles.main}>
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
 