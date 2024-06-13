export const ROOMS_URL = '/api/rooms';
export const JOIN_ROOM_URL = '/join_room';
export const HOST_ROOM_URL = '/host_room';
export const CLOSE_ROOM_URL = '/close_room';

export const SONGS_URL = '/api/songs';
export const GET_SONG_URL = '/get_song';
export const GET_POSITION = '/get_position';
export const ADVANCE_POSITION = '/advance_position';
export const PREVIOUS_POSITION = '/previous_position';
export const ADVANCE_SONG = '/advance_song';

export const QUEUES_URL = '/api/queues';
export const GET_TOP_QUEUE = '/get_top_queue';
export const GET_ALL_QUEUE = '/get_all_queue';
export const REORDER_QUEUE = '/reorder_queue';
export const REMOVE_SONG_FROM_QUEUE = '/remove_song_from_queue';
export const PREVIOUS_SONG = '/previous_song';
export const SEARCH_SONG_FROM_DB = '/search_song_from_db';
export const ADD_SONG_TO_QUEUE = '/add_song_to_queue';
export const GET_SONG_FROM_URL = '/get_song_from_url';
export const ADD_CUSTOM_SONG = '/add_custom_song';
export const HAS_NEXT_SONG = '/has_next_song';
export const HAS_PREV_SONG = '/has_previous_song';

export const STATISTICS_URL = '/api/statistics';
export const GET_WEEKLY_TOP_10 = '/get_weekly_top_10';

export const buildUrl = (url: string, ...params: string[]) => {
    return url + (params.length > 0 ? '/:' : '') + params.join('/:')
}


