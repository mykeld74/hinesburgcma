import type { PageServerLoad } from './$types';
import { querySanity } from '$lib/utils/sanity';

export const load: PageServerLoad = async () => {
	const now = new Date().toISOString();

	// Query for banner and modal content with rich text content field
	// Filter by date: show if (no startDate OR startDate <= now) AND (no endDate OR endDate >= now)
	const bannerContent = await querySanity(
		`*[_type == "banner" && !(_id in path("drafts.**")) 
			&& (!defined(startDate) || startDate <= $now)
			&& (!defined(endDate) || endDate >= $now)
		] | order(_updatedAt desc) {
			_id,
			_type,
			title,
			content[] {
				...,
				_type,
				_key,
				asset-> {
					_id,
					url,
					metadata {
						dimensions {
							width,
							height,
							aspectRatio
						}
					}
				},
				"imageUrl": asset->url,
				"imageAlt": alt
			},
			enabled,
			startDate,
			endDate,
			_updatedAt,
			_createdAt
		}`,
		{ now }
	);
	const modalContent = await querySanity(
		`*[_type == "modal" && !(_id in path("drafts.**"))
			&& (!defined(startDate) || startDate <= $now)
			&& (!defined(endDate) || endDate >= $now)
		] | order(_updatedAt desc) {
			_id,
			_type,
			title,
			content[] {
				...,
				_type,
				_key,
				asset-> {
					_id,
					url,
					metadata {
						dimensions {
							width,
							height,
							aspectRatio
						}
					}
				},
				"imageUrl": asset->url,
				"imageAlt": alt
			},
			enabled,
			startDate,
			endDate,
			_updatedAt,
			_createdAt,
			"imageUrl": image.asset->url,
			image {
				asset-> {
					_id,
					url,
					metadata {
						dimensions {
							width,
							height,
							aspectRatio
						}
					}
				}
			},
			contentBlocks[] {
				_type,
				_key,
				content[] {
					...,
					_type,
					_key,
					asset-> {
						_id,
						url,
						metadata {
							dimensions {
								width,
								height,
								aspectRatio
							}
						}
					},
					"imageUrl": asset->url,
					"imageAlt": alt
				},
				"imageUrl": image.asset->url,
				image {
					asset-> {
						_id,
						url,
						metadata {
							dimensions {
								width,
								height,
								aspectRatio
							}
						}
					}
				}
			}
		}`,
		{ now }
	);

	return {
		bannerContent,
		modalContent
	};
};
