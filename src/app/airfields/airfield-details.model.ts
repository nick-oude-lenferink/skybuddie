import { AirfieldTypeEnum, SurfaceEnum, AirfieldCategoryEnum } from "./airfield-list.model";

export interface AirfieldDetails {
    code: string;
    name: string;
    lng: number;
    lat: number;
    type: AirfieldTypeEnum;
    surface: SurfaceEnum;
    category: AirfieldCategoryEnum;
}