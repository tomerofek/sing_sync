/*import { Injectable } from '@angular/core';
// import { Food } from '../shared/models/Food';
// import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/url';
import { BASE_URL, HELLO_URL, ROOMS_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

//   getAll(): Observable<Food[]> {
//     return this.http.get<Food[]>(FOODS_URL);
//   }

//   getAllFoodsBySearchTerm(searchTerm:string){
//     return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
//   }

//   getAllTags(): Observable<Tag[]> {
//     return this.http.get<Tag[]>(FOODS_TAGS_URL);
//   }

//   getAllFoodsByTag(tag: string): Observable<Food[]> {
//     return tag === "All" ?
//       this.getAll() :
//       this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
//   }
//   getFoodById(foodId:string):Observable<Food>{
//     return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
//   }

//  send hello to server
sendHello(message: string) {
        this.http.post(HELLO_URL, { message: message })
            .subscribe(response => {
                console.log(response);
            });
    }

    getSongFromUrl(roomId: string, url: string): Observable<any> {
      const encodedUrl = encodeURIComponent(url);
      return this.http.get(`${BASE_URL}/api/room/get_song_from_url/${roomId}/${encodedUrl}`);
    }

}*/
