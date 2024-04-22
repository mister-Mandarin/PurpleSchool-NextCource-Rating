'use client';
import styles from './Rating.module.css';
import {HTMLAttributes, useEffect, useState, KeyboardEvent} from 'react';
import StarIcon from './Star.svg';
import cn from 'classnames';

interface RatingProps extends HTMLAttributes<HTMLDivElement> {
    isEdit?: boolean;
    rating: number;
    setRating?: (rating: number) => void;
}

export default function Rating({setRating, isEdit = false, rating, ...props}: RatingProps) {

	const [ratingValue, setRatingValue] = useState(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	}, [rating]);


	function constructRating(currentRating: number) {
		const newRating = ratingValue.map((r, i) => {
			return (
				<span
					key={i}
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEdit
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => clickElement(i + 1)}
				>
					<StarIcon
						tabIndex={isEdit ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGElement>) => isEdit && keyEnter(i + 1, e)}
					/>
				</span>
			);
		});
		setRatingValue(newRating);
	}

	function changeDisplay(i: number) {
		if (!isEdit) {
			return;
		}
		constructRating(i);
	}

	function clickElement(i: number) {
		if (!isEdit || !setRating) {
			return;
		}
		setRating(i);
	}

	function keyEnter(i: number, e: KeyboardEvent<SVGElement>) {
		if (e.code != 'Space' || !setRating) {
			return;
		}
		setRating(i);
	}

	return (
		<div {...props}>
			{ratingValue.map((r, i) => (<span key={i}>{r}</span>))}
		</div>
	);
}