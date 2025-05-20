import { db, LoginUser } from "./platform";
import { Location, LocationInput } from "./generated/graphql";
import * as geofire from "geofire-common";

export class MapService {
  constructor() {}
  resolveLocation(address: string): {location: Location, geohash: geofire.Geohash}| null {
    // Compute the GeoHash for a lat/lng point
    // In a real application, you would use a geocoding service to get the lat/lng from the address
    // For example, using Google Maps Geocoding API
    const lat = 51.5074;
    const lng = 0.1278;
    const hash = geofire.geohashForLocation([lat, lng]);
    return {
      location: {
        latitude: lat,
        longitude: lng,
      },
      geohash: hash,
    };
  }
  async getLocationsByRadius(
    query: FirebaseFirestore.Query,
    geolocation: Location,
    radiusKm: number
  ): Promise<FirebaseFirestore.DocumentData[]> {
    let center: geofire.Geopoint = [
      geolocation.latitude,
      geolocation.longitude,
    ];
    const radiusInM = radiusKm * 1000;
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = bounds.map((b) => {
      const q = query.orderBy("geohash").startAt(b[0]).endAt(b[1]);
      return q.get();
    });
    const snapshots = await Promise.all(promises);
    const documentDatas: FirebaseFirestore.DocumentData[] = [];
    snapshots.forEach((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const location = doc.get("location") as Location;
        const distanceInKm = geofire.distanceBetween(
          [location.latitude, location.longitude],
          center
        );
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          const data = doc.data();
          documentDatas.push({ id: doc.id, ...data });
        }
      });
    });
    return documentDatas;
  }
}
