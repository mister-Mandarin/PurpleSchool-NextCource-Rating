'use client';

export default function NotFound({
	error
}: { error: Error }) {
	return <>
		<div>Что-то пошло не так. Курс не найден.</div>
		<div>{JSON.stringify(error)}</div>
	</>;
}