import {getPage} from '@/api/page';
import {notFound} from 'next/navigation';
import {getMenu} from '@/api/menu';
import {pages} from 'next/dist/build/templates/app-page';
import NotFound from '@/app/[type]/[product]/not-found';
import {firstLevelMenu, getAllMenus} from '@/helpers/helpers';

interface Params {
	type: string;
	product: string[];
}

async function getSecondLvlPaths(id: number) {
	const allMenus = await getAllMenus();
	return allMenus[id].flatMap(menu2 => menu2.pages.map(menu3 => menu3.alias));
}

// generateStaticParams зарезервированно!
// Нужна для статического создания маршрутов во время сборки проекта
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
	const promises = firstLevelMenu.map(menu1 => getSecondLvlPaths(menu1.id));
	const secondLvlPathsPromises = await Promise.all(promises);

	const params1 = firstLevelMenu.map(product => {
		const menuPaths = secondLvlPathsPromises[product.id];
		//console.log('menuPaths ', menuPaths);
		return {
			type: product.route,
			product: menuPaths.map(menuPath => menuPath)
		};
	});

	console.log('params1 ', params1);
	return params1;
}

export default async function PageCourse({params}: { params: {type: string,  product: string } }) {

	const firstCategoryItem = firstLevelMenu.find(menu => menu.route == params.type);
	if (firstCategoryItem) {
		const secondCategoryItem = await getSecondLvlPaths(firstCategoryItem.id);
		const secondLevel = secondCategoryItem.find(menu => menu == params.product);

		if (!secondLevel) {
			notFound();
		}
	} else notFound();



	return (
		<div>
			<p>Страница params.type {params.type}</p>
			<p>Страница params.alias {params.product}</p>
		</div>
	);
}