import {API} from '@/app/api';
import {MenuItem} from '@/interfaces/menu.interface';

export async function getProduct(firstCategory: number): Promise<MenuItem[]> {
	const res = await fetch(API.product.find, {
		method: 'POST',
		body: JSON.stringify({
			'category': page.category,
			'limit': 10
		}),
		headers: new Headers({'content-type': 'application/json'}),
		next: {revalidate: 10}
	});
	console.log('revalidating getMenu');
	return res.json();
}