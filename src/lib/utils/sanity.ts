import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/private';

let sanityClient: ReturnType<typeof createClient> | null = null;

function initializeSanityClient() {
	const projectId = env.SANITY_PROJECT_ID;
	const dataset = env.SANITY_DATASET;
	const apiToken = env.SANITY_API_TOKEN;

	if (!projectId || !dataset) {
		console.warn(
			'Sanity credentials not configured. Set SANITY_PROJECT_ID and SANITY_DATASET environment variables.'
		);
		return null;
	}

	if (!sanityClient) {
		sanityClient = createClient({
			projectId,
			dataset,
			apiVersion: '2024-01-01',
			useCdn: true,
			token: apiToken // Only needed if querying drafts or writing
		});
	}

	return sanityClient;
}

export function getSanityClient() {
	return initializeSanityClient();
}

export async function querySanity<T = unknown>(
	query: string,
	params?: Record<string, unknown>
): Promise<T[]> {
	const client = getSanityClient();
	if (!client) {
		return [];
	}

	try {
		const results = await client.fetch<T[]>(query, params || {});
		return results || [];
	} catch (error) {
		console.error('Sanity query error:', error);
		return [];
	}
}

/**
 * Check if Sanity is configured and can connect
 */
export async function checkSanityConnection(): Promise<boolean> {
	const client = getSanityClient();
	if (!client) {
		return false;
	}

	try {
		// Simple query to test connection - this queries for all document types
		await client.fetch('*[_type in ["homePage", "page", "hero", "section"]][0...1]');
		return true;
	} catch {
		return false;
	}
}

/**
 * Get all document types available in Sanity
 */
export async function getAvailableDocumentTypes(): Promise<string[]> {
	const client = getSanityClient();
	if (!client) {
		return [];
	}

	try {
		// Query to get all unique document types
		const types = await client.fetch<string[]>('array::unique(*[defined(_type)]._type)');
		return types || [];
	} catch {
		return [];
	}
}

/**
 * Check if there are any documents to display for the home page
 * This will check for common home page content types
 */
export async function getHomePageContent(): Promise<{
	hasContent: boolean;
	documentTypes: string[];
	content: Record<string, unknown[]>;
}> {
	const client = getSanityClient();
	if (!client) {
		return {
			hasContent: false,
			documentTypes: [],
			content: {}
		};
	}

	try {
		// Common home page content types to check for
		const contentTypes = [
			'homePage',
			'hero',
			'section',
			'card',
			'feature',
			'event',
			'announcement'
		];

		const content: Record<string, unknown[]> = {};
		const foundTypes: string[] = [];

		// Query for each content type
		for (const type of contentTypes) {
			try {
				const results = await client.fetch(`*[_type == $type && !(_id in path("drafts.**"))]`, {
					type
				});
				if (results && results.length > 0) {
					content[type] = results;
					foundTypes.push(type);
				}
			} catch {
				// Type might not exist in schema, skip it
				continue;
			}
		}

		return {
			hasContent: foundTypes.length > 0,
			documentTypes: foundTypes,
			content
		};
	} catch (error) {
		console.error('Error fetching home page content:', error);
		return {
			hasContent: false,
			documentTypes: [],
			content: {}
		};
	}
}
