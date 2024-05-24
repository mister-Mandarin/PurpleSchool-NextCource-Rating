import {API} from '@/app/api';
import {ProductModel} from '@/interfaces/product.interface';

export async function getProducts(product: string): Promise<ProductModel[]> {

	const productUpper = product.charAt(0).toUpperCase() + product.slice(1);

	const res = await fetch(API.product.find, {
		method: 'POST',
		body: JSON.stringify({
			'category': productUpper,
			'limit': 10
		}),
		headers: new Headers({'content-type': 'application/json'}),
		next: {revalidate: 10}
	});

	return res.json();
}