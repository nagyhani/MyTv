export interface Search {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    original_name:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    profile_path:       null | string;
    release_date:      string;
    title:             string;
    name:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}
