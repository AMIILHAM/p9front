export interface ISearchPage<T> {
    content?: T;
    totalElements?: number | null;
    numberOfElements?: number | null;
}

export class SearchPage<T> implements ISearchPage<T> {
    constructor(public content?: T,
        public totalElements?: number | null,
        public numberOfElements?: number | null) {
    }
}
