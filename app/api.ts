export const API = {
	topPage: {
		find: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		// Получаем все данные меню 2 и 3 уровня.
		//
		byAlias: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/'
		// Получаем данные по алиасу меню, например по "alias": "photoshop"
		// https://courses-top.ru/api/top-page/byAlias/photoshop
	},
	product: {
		find: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find'
	},
	review: {
		createDemo: process.env.NEXT_PUBLIC_DOMAIN + '/api/review/create-demo'
	}
};