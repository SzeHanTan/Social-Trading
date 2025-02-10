import axios from 'axios';

const API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest";

// Handle both Vite and Jest environments
const getApiKey = () => {
    try {
        if (typeof process !== 'undefined' && process.env.VITE_HUGGINGFACE_API_KEY) {
            return process.env.VITE_HUGGINGFACE_API_KEY;
        }
        return import.meta.env.VITE_HUGGINGFACE_API_KEY;
    } catch (error) {
        return 'test-key'; // Fallback for test environment
    }
};

const headers = {
    'Authorization': `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json'
};

interface SentimentResponse {
    label: string;
    score: number;
}

export async function analyzeSentiment(text: string): Promise<SentimentResponse> {
    try {
        const response = await axios.post(API_URL, {
            inputs: text
        }, { headers });
        
        // Map Hugging Face labels to our sentiment categories
        const result = response.data[0];
        const label = result[0].label;
        let mappedLabel = 'neutral';
        
        // Map LABEL_0, LABEL_1, LABEL_2 to our categories
        switch(label.toLowerCase()) {
            case 'positive':
            case 'label_2':
                mappedLabel = 'positive';
                break;
            case 'negative':
            case 'label_0':
                mappedLabel = 'negative';
                break;
            case 'neutral':
            case 'label_1':
            default:
                mappedLabel = 'neutral';
                break;
        }

        return {
            label: mappedLabel,
            score: result[0].score
        };
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        throw error;
    }
}

// Example usage function for trading posts
export async function analyzeTradingPost(post: string) {
    const sentiment = await analyzeSentiment(post);
    return {
        text: post,
        sentiment: sentiment,
        timestamp: new Date().toISOString()
    };
}

// This is the main service file you need 