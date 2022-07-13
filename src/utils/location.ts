import { Location } from "../models";

export function calcCrowFliesDistance(from: Location, to: Location) {
  const R = 6371; // Radius of the earth in km
  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.long - from.long);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(from.lat)) *
    Math.cos(toRadians(to.lat)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export function toRadians(value: number) {
  return value * Math.PI / 180;
}