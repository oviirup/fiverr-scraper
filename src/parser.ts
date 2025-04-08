import TurndownService from 'turndown';

export function parseMetadata(raw: Record<string, any>) {
  const tw = new TurndownService({ bulletListMarker: '-', br: '' });
  let description = '';
  if (raw.description?.content) {
    description = tw
      .turndown(raw.description?.content)
      .replace(/\n+/g, '\n')
      .replace(/\n-\s{3,}/g, '\n- ');
  }

  return {
    id: raw.general.gigId,
    title: raw.general.gigTitle,
    link: raw.portfolio.username
      ? `https://www.fiverr.com/${raw.portfolio.username}/${raw.portfolio.slug}`
      : undefined,
    description,
    categories: [
      raw.overview?.categories?.category?.name,
      raw.overview?.categories?.subCategory?.name,
      raw.overview?.categories?.nestedSubCategory?.name,
    ],
    rating: raw.overview?.gig?.rating,
    rating_count: raw.overview?.gig?.rating,
    review_count: raw.reviews?.total_count,
    faqs: raw.faq?.questionsAndAnswers,
    packages: raw.packages?.packageList?.map((pkg) => ({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price ? Math.floor(Number(pkg.price) / 100) : null,
      duration: pkg.duration ? Math.floor(Number(pkg.duration) / 24) : null,
    })),
    tags: raw.tags?.tagsGigList.map((tag) => tag.name),

    metadata: raw.description?.metadataAttributes.map((meta) => ({
      property: meta.metadata?.alias,
      value: meta.options.map((e) => e.label),
    })),
  };
}
