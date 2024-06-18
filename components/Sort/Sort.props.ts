export interface SortProps {
    sort?: SortEnum;
    setSort: (sort: SortEnum) => void;
}

export enum SortEnum {
    Rating,
    Price
}