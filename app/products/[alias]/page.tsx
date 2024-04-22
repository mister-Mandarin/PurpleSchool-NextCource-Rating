import {getPage} from '@/api/page';
import {notFound} from 'next/navigation';
import {getMenu} from '@/api/menu';
import {pages} from 'next/dist/build/templates/app-page';


// generateStaticParams зарезервированно!
// Нужна для статического создания маршрутов во время сборки проекта
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
	const menu = await getMenu(0);
	return menu.flatMap(
		item => item.pages.map(
			page => ({alias: page.alias})));
}

export default async function PageProduct({params}: { params: { alias: string } }) {
	const page = await getPage(params.alias);

	if (!page) {
		notFound();
	}

	return (
		<div>Страница params.alias {params.alias}
			<p>page.title {page.title}</p>
		</div>
	);
}