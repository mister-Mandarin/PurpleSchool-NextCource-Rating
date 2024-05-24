import {API} from '@/app/api';
import {TopPageModel} from '@/interfaces/page.interface';

export async function getPageByAlias(alias: string): Promise<TopPageModel> {

	// задержка для имитации задержки
	// await new Promise((res) => setTimeout(() => {
	// 	res('');
	// }, 3000));
	const res = await fetch(API.topPage.byAlias + alias, {
		next: {revalidate: 10}
	});

	return res.json();
}