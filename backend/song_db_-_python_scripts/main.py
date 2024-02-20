import json
import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By


def add_song_name(driver, song_dict):
    title = driver.find_elements(By.TAG_NAME, 'h1')[0]
    name = driver.execute_script("return arguments[0].children[0].textContent", title)
    song_dict.update({'song_name': name})


def add_song_author(driver, song_dict):
    title = driver.find_elements(By.TAG_NAME, 'h1')[0]
    author = driver.execute_script("return arguments[0].children[1].children[0].textContent", title)
    author = author.strip().replace('\n', '')
    song_dict.update({'song_author': author})


def add_song_lyrics_oof(driver, song_dict):
    song_body = driver.find_elements(By.CLASS_NAME, "chords")[0]
    childNodes = driver.execute_script("return arguments[0].childNodes;", song_body)
    song_body = []
    line_dict = {'text': "", 'type': ""}
    for childNode in childNodes:
        # each iteration we are gonna add a line of the song to out song dictionary
        # Use get_attribute to access the 'nodeValue' attribute
        if driver.execute_script("return arguments[0].className;", childNode) == 'chord':
            # case chord
            node_value = driver.execute_script("return arguments[0].textContent;", childNode)
            line_dict.update({'type': "chord"})
            str_add_replace = line_dict['text'] + node_value
            line_dict.update({'text': str_add_replace})
        else:
            # case plain text
            node_value = driver.execute_script("return arguments[0].nodeValue;", childNode)

            if '\n' in node_value and node_value.count('\n') == 2:
                # new lyrics line
                strings = node_value.split('\n')
                start = strings[0]
                mid = strings[1]
                end = strings[2]

                # adding the first part to the last line
                line_dict.update({'text': line_dict['text'] + start})
                # adding the last row (should be chords) to the song body
                song_body.append(line_dict)
                # creating a new line for the lyrics
                line_dict = {'type': 'plain_text', 'text': mid}
                # adding the lyrics to the song body
                song_body.append(line_dict)
                # creating a new line with the last part of the line
                line_dict = {'type': '', 'text': end}

            elif '\n' in node_value and node_value.count('\n') == 1:
                # new chords line
                # spliting on line break
                strings = node_value.split('\n')
                start = strings[0]
                end = strings[1]

                # adding the first part to the existing line
                line_dict.update({'text': line_dict['text'] + start})
                song_body.append(line_dict)

                # adding the last part to the next line
                line_dict = {'type': 'chord', 'text': end}


            elif '\n' not in node_value:
                line_dict.update({'text': line_dict["text"] + node_value})

    song_dict.update({'song_body': song_body})
    return


def add_song_lyrics(driver, song_dict):
    song_body_element = driver.find_elements(By.CLASS_NAME, "chords")[0]
    song_parts = driver.execute_script("return arguments[0].childNodes;", song_body_element)
    # building the song body
    song_body = ""
    for node in song_parts:
        if driver.execute_script("return arguments[0].className;", node) == 'chord':
            # case: chord
            node_text = driver.execute_script("return arguments[0].textContent;", node)
            # adding the chord with a prefix to the song body
            song_body += '$' + node_text
        else:
            # case: white spaces / lyrics
            node_text = driver.execute_script("return arguments[0].nodeValue;", node)
            song_body += node_text

    # splitting the song body into lines of chords and lyrics
    song_lines = []
    for line in song_body.split('\n'):
        song_lines.append({'type': 'chords' if '$' in line else 'lyrics',
                           'content': line.replace('$', '')})

    song_dict.update({'song_body': song_lines})


# easter egg #2
def scam_song(driver, url):
    driver.get(url)

    try:
        song_dict = {}
        add_song_name(driver, song_dict)
        add_song_author(driver, song_dict)
        add_song_lyrics(driver, song_dict)

        # saving this into json object
        json_song = json.dumps(song_dict)

        # save into file
        file_name = song_dict['song_name'] + ',' + song_dict['song_author']
        file_name = file_name.replace('"', '')
        with open(f'.\\songs\\{file_name}.json', "w") as json_file:
            json.dump(json_song, json_file)

    except:
        print(f"Error getting song data: {url}")


def get_songs_in_url(driver, url):
    driver.get(url)
    songs_lst = driver.find_elements(By.CLASS_NAME, 'items-list')
    if len(songs_lst) == 0:
        return
    songs_lst = songs_lst[0]
    song_elements_lst = songs_lst.find_elements(By.XPATH, '*')[1:]
    song_links = [s.get_attribute('href') for s in song_elements_lst]
    song_links = [s for s in song_links if s]  # clear elements that does not have the 'href' attribute
    for url_to_song in song_links:
        scam_song(driver, url_to_song)


def get_authors_in_letter(driver, url):
    driver.get(url)
    lst = driver.find_elements(By.CLASS_NAME, 'items-list')
    if len(lst) == 0:
        return
    authors_elements = lst[1].find_elements(By.XPATH, '*')[1:]
    authors_links = [a.get_attribute('href') for a in authors_elements]
    authors_links = [a for a in authors_links if a]  # clear elements that does not have the 'href' attribute
    for link in authors_links:
        get_songs_in_url(driver, link)


def advance_letter_in_url(url):
    broken_url = url.split('%')
    letter_to_advance = broken_url[len(broken_url) - 1]
    hex_value = int(letter_to_advance, 16)
    hex_value = hex_value + 1
    number_as_string = format(hex_value, 'X')
    broken_url[len(broken_url) - 1] = number_as_string
    new_url = ""
    for string in broken_url:
        new_url = new_url + string + '%'
    return new_url[:-1]

#DEPRICATED
if __name__ == '__main__':
    service = Service("C:\\Users\\liory\\Scripts\\FinalProject_songs\\FinalProject\\chromedriver.exe")
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=service, options=options)
    # iterate other all עוף the urls and collect them into a list
    url = "https://www.nagnu.co.il/%D7%90%D7%A7%D7%95%D7%A8%D7%93%D7%99%D7%9D/%D7%90%D7%95%D7%AA%D7%99%D7%95%D7%AA/%D7%A0"
    for i in range(9):
        print(url)
        get_authors_in_letter(driver, url)
        url = advance_letter_in_url(url)

    # easter egg #1
    noder = {
        'text': "קובי תן קובי ארבע אלף כפכפים כל היום דופק בנות בחוף שמה במנדרין, לא יודע את השעה ויש לו 7 שעונים "}

    driver.close()
    driver.quit()
