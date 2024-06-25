import { environment } from "src/environments/environment";

export const BASE_URL = environment.production? '' : 'http://localhost:5000';

// export const FOODS_URL = BASE_URL + '/api/foods';
// export const FOODS_TAGS_URL = FOODS_URL + '/tags';
// export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
// export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
// export const FOOD_BY_ID_URL = FOODS_URL + '/';

export const ROOMS_URL = BASE_URL + '/api/rooms';
export const JOIN_ROOM_URL = ROOMS_URL + '/join_room/';
export const HOST_ROOM_URL = ROOMS_URL + '/host_room';
export const CLOSE_ROOM_URL = ROOMS_URL + '/close_room/'

export const SONGS_URL = BASE_URL + '/api/songs';
export const GET_SONG_URL = SONGS_URL + '/get_song/';
export const GET_POSITION = SONGS_URL + '/get_position/';
export const ADVANCE_POSITION = SONGS_URL + '/advance_position/';
export const PREVIOUS_POSITION = SONGS_URL + '/previous_position/';
export const ADVANCE_SONG = SONGS_URL + '/advance_song/';
export const SEND_HELLO_URL = SONGS_URL + '/send_hello/';

export const QUEUES_URL = BASE_URL + '/api/queues';
export const GET_TOP_QUEUE = QUEUES_URL + '/get_top_queue/';
export const GET_ALL_QUEUE = QUEUES_URL + '/get_all_queue/';
export const REORDER_QUEUE = QUEUES_URL + '/reorder_queue/';
export const REMOVE_SONG_FROM_QUEUE = QUEUES_URL + '/remove_song_from_queue/';
export const SEARCH_SONG_FROM_DB = QUEUES_URL + '/search_song_from_db/';
export const ADD_SONG_TO_QUEUE = QUEUES_URL + '/add_song_to_queue/';
export const GET_SONG_FROM_URL = QUEUES_URL + '/get_song_from_url/';
export const PREVIOUS_SONG = QUEUES_URL + '/previous_song/';
export const HAS_NEXT_SONG = QUEUES_URL + '/has_next_song/';
export const HAS_PREVIOUS_SONG = QUEUES_URL + '/has_previous_song/';
export const ADD_CUSTOM_SONG = QUEUES_URL + '/add_custom_song/';

export const STATISTICS_URL = BASE_URL + '/api/statistics';
export const GET_WEEKLY_TOP_10 = STATISTICS_URL + '/get_weekly_top_10';
