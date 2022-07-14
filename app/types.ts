type Provinces =
  | "Eastern Cape"
  | "Free State"
  | "Gauteng"
  | "KwaZulu-Natal"
  | "Limpopo"
  | "Mpumalanga"
  | "Northern Cape"
  | "North West"
  | "Western Cape";

type Coords = { _latitude: number; _longitude: number };

interface CommonObject {
  title: string;
  url: string;
  email?: string;
  phone?: string;
  city: string;
  province: Provinces;
  coords: Coords | null;
  createdBy: string;
}

interface CoffeeObject extends CommonObject {
  pricing: number;
  hasSundries: boolean;
}

interface BoozeObject extends CommonObject {
  hasWine: boolean;
  hasSpirits: boolean;
  hasBeer: boolean;
}

export type { Coords, Provinces, CoffeeObject, BoozeObject };
