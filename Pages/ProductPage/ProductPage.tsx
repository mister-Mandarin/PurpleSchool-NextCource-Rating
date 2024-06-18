import {FirstLevelMenuItem} from '@/interfaces/menu.interface';
import {TopLevelCategory, TopPageModel} from '@/interfaces/page.interface';
import HhData from '@/components/HhData/HhData';
import Htag from '@/components/Htag/Htag';
import Tag from '@/components/Tag/Tag';
import {ProductModel} from '@/interfaces/product.interface';
import styles from './ProductPage.module.css';
import Advantages from '@/components/Advantages/Advantages';
import DataProduct from '@/components/DataProduct/DataProduct';

interface ProductPageProps {
    firstCategoryItem: FirstLevelMenuItem,
    CurrentPageData: TopPageModel,
    CurrentProductData: ProductModel[]
}

export default function ProductPage({firstCategoryItem, CurrentPageData, CurrentProductData}: ProductPageProps) {
	return (
		<>
			<DataProduct CurrentPageData={CurrentPageData} CurrentProductData={CurrentProductData} />
			<div className={styles.hhTitle}>
				<Htag level={2}>Вакансии - {CurrentPageData.category}</Htag>
				<Tag color='red' size='m'>hh.ru</Tag>
			</div>

			{firstCategoryItem.id == TopLevelCategory.Courses && CurrentPageData?.hh &&
				<HhData {...CurrentPageData.hh}/>}

			{CurrentPageData.advantages && CurrentPageData.advantages.length > 0 &&
				<>
					<Htag className={styles.advantagesTitle} level={2}>Преимущства</Htag>
					<Advantages advantages={CurrentPageData.advantages}/>
				</>
			}

			{CurrentPageData.seoText &&
				<div className={styles.seo} dangerouslySetInnerHTML={{__html: CurrentPageData.seoText}}/>}

			<div className={styles.skills}>
				<Htag className={styles.skillsTitle} level={2}>Получаемые навыки</Htag>
				{CurrentPageData.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
			</div>
		</>
	);
};