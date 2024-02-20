from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import json

directory_path = 'songs'
password = "kGSCzCjKDuKF7NGD"
uri = f"mongodb+srv://final-project:{password}@noder.2cvtm9i.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['SingSync']  # Replace 'your_database' with your database name
collection = db['songs']  # Replace 'your_collection' with your collection name

# example of retrieving from the database
found_document = collection.find_one({"_id": "בשבילך נוצרתי_אייל גולן"})
print(found_document)


def upload():
    files = os.listdir(directory_path)
    for file_name in files:
        file_path = os.path.join(directory_path, file_name)

        # Check if the path is a file (not a directory)
        if os.path.isfile(file_path):
            # Perform operations with the file
            with open(file_path, 'r') as file:
                json_string = json.load(file)
                json_data = json.loads(json_string)
                json_data["_id"] = f"{json_data['song_name']}_{json_data['song_author']}"
                collection.insert_one(json_data)
