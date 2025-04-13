export type GigDetails = {
  id: number;
  title: string;
  link: string;
  description: string;
  categories: string[];
  rating: string;
  rating_count: string;
  review_count: string;
  faqs: string;
  seller: GigSeller;
  packages: GigPackage[];
  tags: string;
  metadata: GigMetadata[];
};

export type GigMetadata = {
  property: string;
  value: string;
};

export type GigSeller = {
  id: number;
  username: string;
  link: string;
  level?: string;
  displayName?: string;
  image?: string;
  isPro?: boolean;
  countryCode?: string;
};

export type GigPackage = {
  title: string;
  description: string;
  price: string | null;
  duration: number | null;
};

export namespace Gig {
  export type Details = GigDetails;
  export type Metadata = GigMetadata;
  export type Package = GigPackage;
}
