//this does the web scraping but does NOT change the database

import axios from 'axios';
import cheerio from 'cheerio';
//import * as cheerio from 'cheerio';

interface ScrapedSong {
    song_name: string;
    song_author: string;
    song_body: { type: string; content: string }[];
}
export class WebScraper {

    async add_song_name($: cheerio.Root, song_dict: ScrapedSong): Promise<void> {
        const title = $('h1').first();
        song_dict.song_name = title.children().first().text().trim();
    }

    async add_song_author($: cheerio.Root, song_dict: ScrapedSong): Promise<void> {
        const title = $('h1').first();
        let author =  $('[itemprop="name"]').eq(2).text();
        song_dict.song_author = author;
    }

    async add_song_lyrics($: cheerio.Root, song_dict: ScrapedSong): Promise<void> {
    const song_body_element = $('.Chords_root__yZkBJ').first();
    const song_lines: { type: string; content: string }[] = [];

    song_body_element.contents().each((_, node) => {
        const text = $(node).text().trim();
        const text_by_lines = text.split('\n');
        
    text_by_lines.forEach((line) => {
        const hasChord = /[a-zA-Z0-9#b]+/.test(line);
        song_lines.push({ type: hasChord ? 'chords' : 'lyrics', content: line });
    });
    });

    song_dict.song_body = song_lines;
    }

    async getSongData(url: string): Promise<ScrapedSong> {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const song_dict: ScrapedSong = { song_name: '', song_author: '', song_body: [] };
            await this.add_song_name($, song_dict);
            await this.add_song_author($, song_dict);
            await this.add_song_lyrics($, song_dict);
            
            resolve(song_dict);})
    }


    async url2song(url: string): Promise<ScrapedSong> {
    return this.getSongData(url);
    }
}