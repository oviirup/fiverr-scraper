import type { GigDetails } from '~/types';
import TurndownService from 'turndown';

export function parseMetadata(raw: Record<string, any>): GigDetails {
  const tw = new TurndownService({ bulletListMarker: '-', br: '' });
  let description = '';
  if (raw.description?.content) {
    description = tw
      .turndown(raw.description?.content)
      .replace(/\n+/g, '\n')
      .replace(/\n-\s{3,}/g, '\n- ');
  }

  const getPrice = (price: number) => {
    if (!price) return null;
    const value = Math.floor(Number(price) / 100);
    return value.toLocaleString('en-US', {
      style: 'currency',
      maximumFractionDigits: 0,
      currency: raw.currency?.name,
    });
  };

  const sellerUsername = raw.overview?.seller?.username;
  const sellerLevelMap = {
    LEVEL_ONE: 1,
    LEVEL_TWO: 2,
    LEVEL_TRS: 3,
  };

  return {
    id: raw.general.gigId,
    title: raw.general.gigTitle,
    link: sellerUsername
      ? `https://www.fiverr.com/${sellerUsername}/${raw.portfolio.slug}`
      : undefined,
    description,
    categories: [
      raw.overview?.categories?.category?.name,
      raw.overview?.categories?.subCategory?.name,
      raw.overview?.categories?.nestedSubCategory?.name,
    ],
    seller: {
      id: raw.overview?.seller?.id,
      username: sellerUsername,
      link: sellerUsername
        ? `https://www.fiverr.com/${sellerUsername}`
        : undefined,
      displayName: raw.seller?.user?.profile?.displayName,
      level: raw.seller?.sellerLevel
        ? sellerLevelMap[raw.seller.sellerLevel]
        : 0,
      image: raw.overview?.seller?.profilePhoto,
      isPro: raw.overview?.seller?.isPro,
      countryCode: raw.overview?.seller?.countryCode,
    },
    rating: raw.overview?.gig?.rating,
    rating_count: raw.overview?.gig?.ratingsCount,
    review_count: raw.reviews?.total_count,
    faqs: raw.faq?.questionsAndAnswers,
    packages: raw.packages?.packageList?.map((pkg) => ({
      title: pkg.title,
      description: pkg.description,
      price: getPrice(pkg.price),
      duration: pkg.duration ? Math.floor(Number(pkg.duration) / 24) : null,
    })),
    tags: raw.tags?.tagsGigList.map((tag) => tag.name),
    metadata: raw.description?.metadataAttributes.map((meta) => ({
      property: meta.metadata?.alias,
      value: meta.options.map((e) => e.label),
    })),
  };
}
