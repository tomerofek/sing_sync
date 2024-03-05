import sys
from webdriver_manager.chrome import ChromeDriverManager
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import requests
import chromedriver_autoinstaller
import io

password = "kGSCzCjKDuKF7NGD"
database_url = f"mongodb+srv://final-project:{password}@noder.2cvtm9i.mongodb.net/?retryWrites=true&w=majority"


def add_song_name(driver, song_dict):
    title = driver.find_elements(By.TAG_NAME, 'h1')[0]
    name = driver.execute_script("return arguments[0].children[0].textContent", title)
    song_dict.update({'song_name': name})


def add_song_author(driver, song_dict):
    title = driver.find_elements(By.TAG_NAME, 'h1')[0]
    author = driver.execute_script("return arguments[0].children[1].children[0].textContent", title)
    author = author.strip().replace('\n', '')
    song_dict.update({'song_author': author})


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


def upload_song(json_data, song_collection):
    json_data["_id"] = f"{json_data['song_name']}_{json_data['song_author']}"
    if song_collection.count_documents({'_id': json_data['_id']}) == 0:
        song_collection.insert_one(json_data)
        return

    song_collection.update_one({"_id": json_data['_id']}, {"$set": {"song_body": json_data['song_body']}})


# easter egg #3 (easter egg 2?!?!?! - credit to Lior)
def scam_song(driver, url, song_collection):
    driver.get(url)

    song_dict = {}
    add_song_name(driver, song_dict)
    add_song_author(driver, song_dict)
    add_song_lyrics(driver, song_dict)

    # saving into json object and uploading to database
    json_song = json.dumps(song_dict)
    json_data = json.loads(json_song)
    upload_song(json_data, song_collection)
    return json_data


def url2song(url):
    # Create a new client and connect to the server
    client = MongoClient(database_url, server_api=ServerApi('1'))
    db = client['SingSync']
    song_collection = db['songs']

    # connect to driver noder
    service = Service("song_db_-_python_scripts\chromedriver.exe")
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.set_capability("browserVersion", "119.0.6045.200")
    #TODO also write the line to be activated once per week FLAMONGODB!!!
    chromedriver_autoinstaller.install() 
    driver = webdriver.Chrome(options=options)
    return scam_song(driver, url, song_collection)


if __name__ == "__main__":
    #need to make sure the chrome version fits the chrome driver version 
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    json_data = url2song(sys.argv[1])
    print(json_data['song_name'] , '_' , json_data['song_author'])

