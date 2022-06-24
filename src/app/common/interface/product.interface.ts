export interface IProductDetails {
  code: number;
  status: string;
  data: IData;
}

export interface IData {
  pageType: [];
  searchTerm: string;
  suggestions: [];
  correctedSearchResponses: [];
  ageRestricted: boolean;
  products: IProducts[];
  sorting: ISorting;
  filters: IFilters[];
  quickFilters: IFilters[];
  paging: IPaging;
  maxOffers:  number;
  serverCurrentTime:  number;
  productInfo: any;
  code: string;
  selectedCategoryIds: [];
  visibleCategoryIds: [];
  exclusiveCampProducts: [];
  exclusiveCampResponse: IExclusiveCampResponse;
  responseFlags: [];
  showRestrictedMsg: boolean;
  redirectionUrl: string;
  trackerFields: ITrackerFields;
  countExceedsLimit: string[];
  productsPerRow: number;
  needMoreSearchResponse: boolean;
  pageMetadata: IPageMetadata;
  intentAttributes: any;
  personalizedAttributes: any;
  nerAttributes: any;
  intentApplied: boolean;
  nerApplied: boolean;
  showAllCategories: boolean;
  searchPageUrl: string;
  catIntentFailed: boolean;
  sellerAdsPosition: number[];
  sellerAdsPositionWebListView: number[];
  sponsorProducts: ISponsorProducts[];
  relatedSearchTermsPosition: number;
  nearbyLocationFailed: boolean;
  correctedNearbyLocation: string;
  interspersedCardFilters: [];
  materiallResponse: boolean;
}

export interface IProducts {
  id: string;
  sku: string;
  merchantCode: string;
  status: string;
  name: string;
  price: IPrice;
  images: string[];
  rootCategory: IRootCategory;
  brand: string;
  review: IReview;
  itemCount: number;
  defaultSku: string;
  itemSku: string;
  tags: string[];
  formattedId: string;
  url: string;
  attributes: IAttributes[];
  productFeatures: string;
  storeClosingInfo: IStoreClosingInfo;
  promoEndTime: number;
  debugData: any;
  allCategories: string[];
  merchantVoucherCount: number;
  expandedProducts: IExpandedProducts[];
  location: string;
  numLocations: number;
  badge: IBadge;
  level0Id: string;
  uniqueSellingPoint: string;
  isCheap: boolean;
  soldRangeCount?: ISoldRangeCount;
  official: boolean;
  preorder: boolean;
}

export interface IPrice {
  priceDisplay: string;
  strikeThroughPriceDisplay?: string;
  discount: number;
  minPrice: number;
  offerPriceDisplay?: string;
}

export interface IRootCategory {
  id: string;
  name: string;
}

export interface IReview {
  rating: number;
  count: number;
  absoluteRating: number;
}

export interface IAttributes {
  optionListingType?: string;
  values?: string[];
  count: number;
}

export interface IStoreClosingInfo {
  storeClosed: boolean;
  endDate: number;
  delayShipping: boolean;
}

export interface IExpandedProducts {
  status: string;
  price: IPrice;
  images: string[];
  review: IReview;
  itemCount: number;
  defaultSku: string;
  tags: string[];
  url: string;
  promoEndTime: number;
  merchantVoucherCount: number;
  numLocations: number;
  badge: IBadge;
  official: boolean;
  preorder: boolean;
}

export interface IBadge {
  merchantBadge: string;
  merchantBadgeUrl: string;
}

export interface ISoldRangeCount {
  en: string;
  id: string;
}

export interface ISorting {
  parameter: string;
  options: IOptions[];
}

export interface IOptions {
  label: string;
  name: string;
  value: number;
  selected: boolean;
}

export interface IFilters {
  name: string;
  label?: string;
  type: string;
  searchable: boolean;
  parameter: string;
  theme: string;
  data: IFiltersData[];
  sublist?: any;
  parentFacets?: [];
  horizontal: boolean;
}

export interface IFiltersData {
  label: string;
  value: string;
  indexName?: string;
  selected: boolean;
  disabled?: boolean;
  id?: string;
  level?: number;
  subCategory?: [];
  subCategorySelected?: boolean;
  restrictedCategory?: boolean;
  query?: string;
  promoBatchUrl?: string;
  tooltip?: string;
  tooltipUrl?: string;
  tooltipText?: string;
  code?: string;
  parameter?: string;
  popular: boolean;
}

export interface IPaging {
  page: number;
  total_page: number;
  item_per_page: number;
  total_item: number;
}

export interface IExclusiveCampResponse {
  exclusiveCampRow: number;
  promoBgImage: string;
  promoTitleImage: string;
  campaignCode: string;
}

export interface ITrackerFields {
  group_type: string;
  sales_velocity_components: string;
}

export interface IPageMetadata {
  numFoundForMisSpelledQuery: string;
  isPartiallyMisSpelt: string;
}

export interface ISponsorProducts {
  destinationUrl: string;
  imageUrl: string;
  mrp: number;
  name: string;
  rank: number;
  salePrice: number;
  sclid: string;
  score: number;
  sellerId: string;
  skuId: string;
  uclid: string;
}

export interface ISearchQuery {
  searchTerm: string;
  start:number;
}
