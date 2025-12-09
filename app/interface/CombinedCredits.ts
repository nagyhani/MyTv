export interface Credits {
    cast: Cast[];
    crew: Cast[];
    id:   number;
}

export interface Cast {
    adult:                  boolean;
    backdrop_path:          null | string;
    genre_ids:              number[];
    id:                     number;
    original_language:      OriginalLanguage;
    original_title?:        string;
    overview:               string;
    popularity:             number;
    poster_path:            null | string;
    release_date?:          string;
    title?:                 string;
    video?:                 boolean;
    vote_average:           number;
    vote_count:             number;
    character?:             string;
    credit_id:              string;
    order?:                 number;
    media_type:             MediaType;
    origin_country?:        OriginCountry[];
    original_name?:         string;
    first_air_date?:        Date;
    name?:                  string;
    episode_count?:         number;
    first_credit_air_date?: Date;
    department?:            Department;
    job?:                   Job;
}

export enum Department {
    Creator = "Creator",
    Directing = "Directing",
    Production = "Production",
    Writing = "Writing",
}

export enum Job {
    Creator = "Creator",
    Director = "Director",
    ExecutiveProducer = "Executive Producer",
    Producer = "Producer",
    Writer = "Writer",
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

export enum OriginCountry {
    CA = "CA",
    De = "DE",
    Us = "US",
}

export enum OriginalLanguage {
    De = "de",
    En = "en",
    Es = "es",
    Fr = "fr",
    Pt = "pt",
}