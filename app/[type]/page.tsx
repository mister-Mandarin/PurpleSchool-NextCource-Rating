import {getPage} from '@/api/page';
import {notFound} from 'next/navigation';
import {getMenu} from '@/api/menu';
import {pages} from 'next/dist/build/templates/app-page';
import NotFound from '@/app/[type]/[product]/not-found';
import {firstLevelMenu} from '@/helpers/helpers';


// generateStaticParams зарезервированно!
// Нужна для статического создания маршрутов во время сборки проекта
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// export function generateStaticParams() {
// 	const params = firstLevelMenu.map(menu => ({
// 		type: menu.route
// 	}));
// 	console.log('params type ', params);
// 	return params;
// }

export default async function PageCourse({params}: { params: { type: string  } }) {

	const firstCategoryItem = firstLevelMenu.find(menu => menu.route == params.type);

	if (!firstCategoryItem) {
		notFound();
	}

	return (
		<div>
			<p>Это страница {params.type}</p>
		</div>
	);
}
