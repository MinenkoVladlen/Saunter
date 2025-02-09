export interface Route {
  id?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  distance: number;
  markers: { lat: number; lng: number }[];
  isFavorite: boolean;
}
