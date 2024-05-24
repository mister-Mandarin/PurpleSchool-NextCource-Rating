import {notFound} from 'next/navigation';
import {firstLevelMenu} from '@/helpers/helpers';

// generateStaticParams зарезервированно!
// Нужна для статического создания маршрутов во время сборки проекта
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export function generateStaticParams() {
	return firstLevelMenu.map(menu => ({
		type: menu.route
	}));
}

export default async function PageCourse({params}: { params: { type: string } }) {

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
