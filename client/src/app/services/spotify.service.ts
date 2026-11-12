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
    return this.sendRequestToExpress('/artist/' + artistId).then((data) => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/artist/' + artistId + '/top-tracks').then((data) => {
      return data.tracks.map((item) => new TrackData(item));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    return this.sendRequestToExpress('/artist/' + artistId + '/albums').then((data) => {
      return data.albums.items.map((item) => new AlbumData(item));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    return this.sendRequestToExpress('/album/' + albumId).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/album/' + albumId + '/tracks').then((data) => {
      return data.tracks.map((item) => new TrackData(item));
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    return this.sendRequestToExpress('/track/' + trackId).then((data) => {
      return new TrackData(data);
    });
  }
}