import {FirstLevelMenuItem, MenuItem} from '@/interfaces/menu.interface';
import CoursesIcon from '@/helpers/icons/courses.svg';
import {TopLevelCategory} from '@/interfaces/page.interface';
import ServicesIcon from '@/helpers/icons/services.svg';
import BooksIcon from '@/helpers/icons/books.svg';
import ProductsIcon from '@/helpers/icons/products.svg';
import {getMenu} from '@/api/getMenu';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
	{route: 'services', name: 'Сервисы', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
	{route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
	{route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products}
];

export async function getAllMenus(): Promise<MenuItem[][]>{
	const allMenus: MenuItem[][] = [];
	for (let i = 0; i < 4; i++) {
		const menu = await getMenu(i);
		allMenus.push(menu);
	}
	return allMenus;
}

// https://learn.javascript.ru/intl
export const priceRuIntl = (price: number): string =>
	new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0
	}).format(price);