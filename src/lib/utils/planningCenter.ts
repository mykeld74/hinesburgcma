import { PLANNING_CENTER_APPLICATION_ID, PLANNING_CENTER_SECRET } from '$env/static/private';

// Auth configuration - determine once at startup
let authHeader: string;

function initializeAuth() {
	if (!PLANNING_CENTER_APPLICATION_ID || !PLANNING_CENTER_SECRET) {
		console.warn(
			'Planning Center credentials not configured. Set PLANNING_CENTER_APPLICATION_ID and PLANNING_CENTER_SECRET environment variables.'
		);
		return;
	}

	const isPAT = PLANNING_CENTER_SECRET.startsWith('pco_pat_');
	if (isPAT) {
		// Use Basic Auth for Personal Access Tokens
		const basicAuth = Buffer.from(
			`${PLANNING_CENTER_APPLICATION_ID}:${PLANNING_CENTER_SECRET}`
		).toString('base64');
		authHeader = `Basic ${basicAuth}`;
	} else {
		// Use Bearer token for OAuth tokens
		authHeader = `Bearer ${PLANNING_CENTER_SECRET}`;
	}
}

// Initialize auth on module load
initializeAuth();

/**
 * Make a request to the Planning Center Publishing API
 * @param endpoint - API endpoint path (e.g., '/channels', '/episodes')
 * @param options - Additional fetch options
 */
export async function callPlanningCenterAPI<T = unknown>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T | null> {
	if (!authHeader) {
		console.warn('Planning Center credentials not configured');
		return null;
	}

	const baseUrl = 'https://api.planningcenteronline.com/publishing/v2';
	const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

	try {
		const response = await fetch(url, {
			...options,
			headers: {
				Authorization: authHeader,
				Accept: 'application/json',
				'X-API-Version': '2024-03-25',
				'User-Agent': 'hinesburgcma/1.0',
				...options.headers
			}
		});

		// Handle rate limiting
		if (response.status === 429) {
			const retryAfter = response.headers.get('Retry-After');
			const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
			await new Promise((resolve) => setTimeout(resolve, waitTime));
			// Retry once
			const retryResponse = await fetch(url, {
				...options,
				headers: {
					Authorization: authHeader,
					Accept: 'application/json',
					'X-API-Version': '2024-03-25',
					'User-Agent': 'hinesburgcma/1.0',
					...options.headers
				}
			});
			if (!retryResponse.ok) {
				const errorText = await retryResponse.text();
				console.error(`Planning Center API error (${retryResponse.status}):`, errorText);
				return null;
			}
			const data = await retryResponse.json();
			return data as T;
		}

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`Planning Center API error (${response.status}):`, errorText);
			// Return error details for debugging
			return {
				error: true,
				status: response.status,
				statusText: response.statusText,
				message: errorText,
				url: url
			} as T;
		}

		const data = await response.json();
		return data as T;
	} catch (error) {
		console.error('Planning Center API request error:', error);
		return null;
	}
}

/**
 * Get all channels
 */
export async function getChannels() {
	return callPlanningCenterAPI('/channels');
}

/**
 * Get all episodes
 */
export async function getEpisodes(params?: { per_page?: number; offset?: number }) {
	const queryParams = params
		? `?${new URLSearchParams(params as Record<string, string>).toString()}`
		: '';
	return callPlanningCenterAPI(`/episodes${queryParams}`);
}

/**
 * Get a specific episode by ID
 */
export async function getEpisode(episodeId: string) {
	return callPlanningCenterAPI(`/episodes/${episodeId}`);
}

/**
 * Get all series
 */
export async function getSeries() {
	return callPlanningCenterAPI('/series');
}

/**
 * Try to get pages (if the endpoint exists)
 */
export async function getPages() {
	return callPlanningCenterAPI('/pages');
}

/**
 * Try to get a specific page by slug/ID
 */
export async function getPage(pageId: string) {
	return callPlanningCenterAPI(`/pages/${pageId}`);
}

/**
 * Get organization info
 */
export async function getOrganization() {
	return callPlanningCenterAPI('/organization');
}

/**
 * Test API connection and return available endpoints
 */
export async function testPlanningCenterConnection() {
	if (!authHeader) {
		return {
			connected: false,
			error: 'Missing credentials - check PLANNING_CENTER_APPLICATION_ID and PLANNING_CENTER_SECRET'
		};
	}

	try {
		// Try to get organization info as a simple connection test
		const org = await getOrganization();
		return {
			connected: org !== null,
			organization: org
		};
	} catch (error) {
		return {
			connected: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}
