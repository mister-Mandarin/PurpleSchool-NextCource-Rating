import {FirstLevelMenuItem} from '@/interfaces/menu.interface';
import {TopLevelCategory, TopPageModel} from '@/interfaces/page.interface';
import HhData from '@/components/HhData/HhData';

interface ProductPageProps {
	firstCategoryItem: FirstLevelMenuItem,
	CurrentPageData: TopPageModel | null
}

export default function ProductPage({firstCategoryItem, CurrentPageData}: ProductPageProps) {
	return (
		<div>
			{/*{firstCategoryItem.name}*/}
			{firstCategoryItem.id == TopLevelCategory.Courses && <HhData {...CurrentPageData?.hh} />}
		</div>
	);
};