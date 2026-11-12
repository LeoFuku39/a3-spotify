import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var uri:string = this.expressBaseUrl + endpoint;

    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    if (category === 'artist') {
      return this.sendRequestToExpress('/search/artist/' + encodeURIComponent(resource)).then((data) => {
        return data.artists.items.map((item) => new ArtistData(item));
      }
      );
    } else if (category === 'album') {
      return this.sendRequestToExpress('/search/album/' + encodeURIComponent(resource)).then((data) => {
        return data.albums.items.map((item) => new AlbumData(item));
      }
      );
    } else if (category === 'track') {
      return this.sendRequestToExpress('/search/track/' + encodeURIComponent(resource)).then((data) => {
        return data.tracks.items.map((item) => new TrackData(item));
      }
      );
    } else {
      return Promise.reject('Invalid category');
    }
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return null as any;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return null as any;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return null as any;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return null as any;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null as any;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null as any;
  }
}