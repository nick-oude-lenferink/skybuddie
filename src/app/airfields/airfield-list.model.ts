export interface AirfieldListModel {
  code: string;
  city: string;
  country: string;
  name: string;
  type: AirfieldTypeEnum;
  surface: SurfaceEnum;
  category: AirfieldCategoryEnum;
}

export enum AirfieldTypeEnum {
  Controlled = 'controlled',
  Uncontrolled = 'uncontrolled'
}

export enum SurfaceEnum {
  Paved = 'paved',
  Grass = 'grass'
}

export enum AirfieldCategoryEnum {
  Commercial = 'commercial',
  Recreational = 'recreational'
}
