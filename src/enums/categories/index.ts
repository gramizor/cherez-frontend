// other
export enum OtherSubcategories {}

// personal items
export enum CategoryInfoPersonalItemsEnum {
  OfferType = 'offerType',
  Quality = 'quality',
  Target = 'target',
  ItemType = 'itemType',
}

export enum PersonalItemsSubcategories {
  Other = 'OTHER',
  Cloth = 'CLOTH',
  Shoes = 'SHOES',
  Accessory = 'ACCESSORY',
  Toy = 'TOY',
  Sport = 'SPORT',
  Bicycle = 'BICYCLE',
}

export enum PersonalItemsOfferTypes {
  Sell = 'SELL',
  Gift = 'GIFT',
  Rent = 'RENT',
}

export enum PersonalItemsTargets {
  Men = 'MEN',
  Women = 'WOMEN',
  Kids = 'KIDS',
  Everyone = 'EVERYONE',
}

// jobs
export enum CategoryInfoJobsEnum {
  AdType = 'adType',
}

export enum JobsSubcategories {
  Hiring = 'HIRING',
  Search = 'SEARCH',
}

// spare parts
export enum CategoryInfoSparePartsEnum {
  Subcategory = 'subcategory',
  Quality = 'quality',
  Manufacturer = 'manufacturer',
  PartNumber = 'partNumber',
}

export enum SparePartsSubcategories {
  Parts = 'PARTS',
  Tires = 'TIRES',
  Chemical = 'CHEMICAL',
  Tools = 'TOOLS',
  Accessories = 'ACCESSORIES',
  Baggage = 'BAGGAGE',
  MotorcycleEquipment = 'MOTORCYCLE_EQUIPMENT',
  AudioVideo = 'AUDIO_VIDEO',
  Electronics = 'ELECTRONICS',
  Other = 'OTHER',
}

// health items
export enum CategoryInfoHealthItemsEnum {
  AdType = 'adType',
  Subcategory = 'subcategory',
}

export enum HealthItemsAdTypes {
  NewProduct = 'NEW_PRODUCT',
  UsedProduct = 'USED_PRODUCT',
}

export enum HealthItemsSubcategories {
  BodyCare = 'BODY_CARE',
  DietarySupplements = 'DIETARY_SUPPLEMENTS',
  Perfumery = 'PERFUMERY',
  Cosmetics = 'COSMETICS',
  ForHair = 'FOR_HAIR',
  Devices = 'DEVICES',
  Tools = 'TOOLS',
  Other = 'OTHER',
}

// animals
export enum CategoryInfoAnimalsEnum {
  AdType = 'adType',
}

export enum AnimalsSubcategories {
  Goods = 'GOODS',
  Animals = 'ANIMALS',
}

// household
export enum CategoryInfoHouseholdEnum {
  Quality = 'quality',
  Subcategory = 'subcategory',
}

export enum HouseholdSubcategories {
  Appliances = 'APPLIANCES',
  Food = 'FOOD',
  Furniture = 'FURNITURE',
  BedSheets = 'BED_SHEETS',
  Repairing = 'REPAIRING',
  Kitchen = 'KITCHEN',
  Bathroom = 'BATHROOM',
  Bedroom = 'BEDROOM',
  Dishes = 'DISHES',
  Tools = 'TOOLS',
  Plants = 'PLANTS',
  Other = 'OTHER',
}

// devices

export enum CategoryInfoDevicesEnum {
  Quality = 'quality',
  Subcategory = 'manufacturer',
  Brand = 'brand',
}

export enum DevicesSubcategories {
  Phone = 'PHONE',
  Photographic = 'PHOTOGRAPHIC',
  AudioAndVideo = 'AUDIO_AND_VIDEO',
  Computer = 'COMPUTER',
  ComputerParts = 'COMPUTER_PARTS',
  GameConsole = 'GAME_CONSOLE',
  Office = 'OFFICE',
  Other = 'OTHER',
}

export enum DevicesQualities {
  New = 'NEW',
  Used = 'USED',
}

// real estate
export enum CategoryInfoRealEstateEnum {
  RealEstateType = 'realEstateType',
  Area = 'area',
  Baths = 'baths',
  Bedrooms = 'bedrooms',
  Furniture = 'furniture',
  Gym = 'gym',
  Name = 'name',
  OfferType = 'offerType',
  Pool = 'pool',
}

export enum RealEstateSubcategories {
  Studio = 'STUDIO',
  Apartment = 'APARTMENT',
  Townhouse = 'TOWNHOUSE',
  House = 'HOUSE',
}

export enum RealEstateOfferTypes {
  Rent = 'RENT',
  Sell = 'SELL',
}

export enum RealEstateCount {
  One = 'ONE',
  Two = 'TWO',
  ThreeAndMore = 'THREE_AND_MORE',
}

export enum RealEstateAddons {
  Furniture = 'FURNITURE',
  Pool = 'POOL',
  Gym = 'GYM',
}

// vehicle
export enum CategoryInfoVehicleEnum {
  VehicleType = 'vehicleType',
  Quality = 'quality',
  Condition = 'condition',
  MileageMeasure = 'mileageMeasure',
  Color = 'color',
  TransmissionType = 'transmissionType',
  FuelType = 'fuelType',
  Mileage = 'mileage',
  ReleaseYear = 'releaseYear',
  Brand = 'brand',
  Model = 'model',
}

export enum VehicleMileageMeasures {
  Kilometer = 'KILOMETER',
  Mile = 'MILE',
}

export enum VehicleCondition {
  VeryGood = 'VERY_GOOD',
  Good = 'GOOD',
  Normal = 'NORMAL',
  Bad = 'BAD',
}

export enum VehicleTransmissionType {
  Manual = 'MANUAL',
  Automatic = 'AUTOMATIC',
}

export enum VehicleColor {
  White = 'WHITE',
  Silver = 'SILVER',
  Gray = 'GRAY',
  Black = 'BLACK',
  Brown = 'BROWN',
  Golden = 'GOLDEN',
  Beige = 'BEIGE',
  Red = 'RED',
  Vinous = 'VINOUS',
  Orange = 'ORANGE',
  Yellow = 'YELLOW',
  Green = 'GREEN',
  Blue = 'BLUE',
  Violet = 'VIOLET',
  Purple = 'PURPLE',
  Pink = 'PINK',
}

export enum VehicleFuelType {
  Gasoline = 'GASOLINE',
  Diesel = 'DIESEL',
  Gas = 'GAS',
  Electricity = 'ELECTRICITY',
  Hybrid = 'HYBRID',
  Other = 'OTHER',
}

export enum VehicleSubcategories {
  Car = 'CAR',
  Motorcycle = 'MOTORCYCLE',
  Other = 'OTHER',
}

// service
export enum CategoryInfoServicesEnum {
  Subcategory = 'subcategory',
}

export enum ServiceSubcategories {
  Transportation = 'TRANSPORTATION',
  Entertainment = 'ENTERTAINMENT',
  Jurisprudence = 'JURISPRUDENCE',
  Health = 'HEALTH',
  Household = 'HOUSEHOLD',
  Maintenance = 'MAINTENANCE',
  Educational = 'EDUCATIONAL',
  Caregiving = 'CAREGIVING',
  Other = 'OTHER',
}

// common

export enum KeysSubcategories {
  ItemType = 'itemType',
  Subcategory = 'subcategory',
  AdType = 'adType',
  RealEstateType = 'realEstateType',
  VehicleType = 'vehicleType',
  OfferType = 'offerType',
  Brand = 'brand',
  Model = 'model',
  ReleaseYear = 'releaseYear',
  MileageMeasure = 'mileageMeasure',
  Mileage = 'mileage',
  Condition = 'condition',
  FuelType = 'fuelType',
  TransmissionType = 'transmissionType',
  BedroomsCount = 'bedroomsCount',
  BathsCount = 'bathsCount',
  Furniture = 'furniture',
  Pool = 'pool',
  Gym = 'gym',
  Quality = 'quality',
  Target = 'target',
  PartNumber = 'partNumber',
  Manufacturer = 'manufacturer',
  VehicleColor = 'vehicleColor',
  Area = 'area',
}

export enum CategoriesType {
  Services = 'services',
  Vehicle = 'vehicle',
  RealEstate = 'realEstate',
  Devices = 'devices',
  Household = 'household',
  Animals = 'animals',
  PersonalItems = 'personalItems',
  Jobs = 'jobs',
  HealthItems = 'healthItems',
  SpareParts = 'spareParts',
  Other = 'other',
}
