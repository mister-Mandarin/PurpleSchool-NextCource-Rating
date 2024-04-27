'use client';

export default function NotFound({
	error
}: { error: Error }) {
	return <>
		<div>Что-то пошло не так. Такого пункта меню нет.</div>
		<div>{JSON.stringify(error)}</div>
	</>;
}