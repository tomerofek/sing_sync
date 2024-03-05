//this does the web scraping but does NOT change the database

import axios from 'axios';
import cheerio from 'cheerio';
import { MongoClient } from 'mongodb';

interface ScrapedSong {
    song_name: string;
    song_author: string;
    song_body: { type: string; content: string }[];
}

const password = "kGSCzCjKDuKF7NGD";
const database_url = `mongodb+srv://final-project:${password}@noder.2cvtm9i.mongodb.net/?retryWrites=true&w=majority`;

async function add_song_name($: cheerio.Root, song_dict: ScrapedSong): Promise<void> {
    const title = $('h1').first();
    song_dict.song_name = title.children().first().text().trim();
}

async function add_song_author($: cheerio.Root, song_dict: ScrapedSong): Promise<void> {
    const title = $('h1').first();
    let author = title.children().eq(1).children().first().text().trim().replace('\n', '');
    song_dict.song_author = author;
}

async function add_song_lyrics($: cheerio.Root, song_dict: ScrapedSong): Promise<void> {
  const song_body_element = $('.Chords_root__dhQIM').first();
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

async function getSongData(url: string): Promise<ScrapedSong> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const song_dict: ScrapedSong = { song_name: '', song_author: '', song_body: [] };
    await add_song_name($, song_dict);
    await add_song_author($, song_dict);
    await add_song_lyrics($, song_dict);
    return song_dict;
}

async function url2song(url: string): Promise<ScrapedSong> {
  const song = await getSongData(url);
  return song;
}

if (require.main === module) {
      const url = "https://www.nagnu.co.il/%D7%90%D7%A7%D7%95%D7%A8%D7%93%D7%99%D7%9D/%D7%A0%D7%95%D7%A2%D7%94_%D7%A7%D7%99%D7%A8%D7%9C,_%D7%A9%D7%92%D7%99%D7%90_%D7%A7%D7%A8%D7%99%D7%91,_%D7%A4%D7%95%D7%A8%D7%90%D7%91%D7%A8_%D7%AA%D7%9C_%D7%90%D7%91%D7%99%D7%91/%D7%A4%D7%A8%D7%95%D7%91%D7%95%D7%A7%D7%98%D7%99%D7%91%D7%99%D7%AA";
       if (url) {
        url2song(url)
            .then(song => console.log(song.song_body))
            .catch(error => console.error('Error:', error));
    } else {
        console.error('Usage: node script.js <url>');
    }
}
