interface SimilarityRequest {
    source_sentence: string;
    sentences: string[];
}

export class HuggingFaceAPI {
    private model: string;
    private apiKey: string;
    private maxRetries: number = 3;

    constructor() {
        this.model = 'sentence-transformers/all-mpnet-base-v2';
        this.apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
        if (!this.apiKey) {
            console.warn('HuggingFace API key not found');
        }
    }

    async getSimilarities(query: string, documents: string[], retryCount = 0): Promise<number[]> {
        try {
            console.log('Starting API call to HuggingFace...');
            console.log('API URL:', `https://api-inference.huggingface.co/models/${this.model}`);
            console.log('API Key:', this.apiKey ? 'Present' : 'Missing');
            
            const response = await fetch(
                `https://api-inference.huggingface.co/models/${this.model}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputs: {
                            source_sentence: query,
                            sentences: documents
                        }
                    })
                }
            );

            // Add response status logging
            console.log('Response status:', response.status);
            
            if (response.status === 503) {
                const data = await response.json();
                const waitTime = Math.ceil(data.estimated_time || 20);
                console.log(`Model is loading. Waiting ${waitTime} seconds before retry...`);
                
                if (retryCount < this.maxRetries) {
                    // Wait for the estimated time
                    await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
                    // Retry the request
                    return this.getSimilarities(query, documents, retryCount + 1);
                } else {
                    throw new Error('Max retries reached while waiting for model to load');
                }
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Details:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorText: errorText
                });
                throw new Error(`HuggingFace API error: ${response.statusText}\n${errorText}`);
            }

            const similarities = await response.json();
            console.log('Successful API response:', similarities);
            return similarities;

        } catch (error) {
            console.error('Detailed error:', {
                name: error instanceof Error ? error.name : 'Unknown error',
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            });
            throw error;
        }
    }
}