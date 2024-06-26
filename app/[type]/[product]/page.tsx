import {notFound} from 'next/navigation';
import {firstLevelMenu, getAllMenus} from '@/helpers/helpers';
import ProductPage from '@/Pages/ProductPage/ProductPage';
import {getPageByAlias} from '@/api/getPageByAlias';
import {TopPageModel} from '@/interfaces/page.interface';
import {getProducts} from '@/api/products';

interface Params {
    type: string;
    product: string;
}

async function getSecondLvlPaths(id: number) {
	const allMenus = await getAllMenus();
	return allMenus[id].flatMap(menu2 => menu2.pages.map(menu3 => menu3.alias));
}

// 3 сука дня ушло на то, чтобы написать правильно generateStaticParams и собрался проект
// надо лучше гуглить и читать документацию. Я крут)))


// generateStaticParams зарезервированно!
// Нужна для статического создания маршрутов во время сборки проекта
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
	const promises = firstLevelMenu.map(menu1 => getSecondLvlPaths(menu1.id));
	const secondLvlPathsPromises = await Promise.all(promises);

	const paths = firstLevelMenu.flatMap((menu1, index) => {
		const menuPaths = secondLvlPathsPromises[index];
		return menuPaths.map(s => ({
			type: menu1.route,
			product: s

		}));
	});

	return paths;
}

export default async function PageCourse({params}: { params: { type: string, product: string } }) {

	const firstCategoryItem = firstLevelMenu.find(menu => menu.route == params.type);
	if (firstCategoryItem) {
		const secondCategoryItem = await getSecondLvlPaths(firstCategoryItem.id);
		const secondLevel = secondCategoryItem.find(menu => menu == params.product);

		if (!secondLevel) {
			notFound();
		}
	} else notFound();

	const CurrentPageData = await getPageByAlias(params.product);
	const CurrentProductData = await getProducts(params.product);


	return <ProductPage
		firstCategoryItem={firstCategoryItem}
		CurrentPageData={CurrentPageData}
		CurrentProductData={CurrentProductData}
	/>;
}