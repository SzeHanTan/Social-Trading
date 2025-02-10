import { HfInference } from '@huggingface/inference';

const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const MODEL_NAME = import.meta.env.VITE_TRADER_MATCHING_MODEL;

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const hf = new HfInference(HF_API_KEY);
  
  try {
    console.log('Starting API call to HuggingFace...');
    console.log('API URL:', `https://api-inference.huggingface.co/models/${MODEL_NAME}`);
    console.log('API Key:', HF_API_KEY ? 'Present' : 'Missing');

    const response = await hf.featureExtraction({
      model: MODEL_NAME,
      inputs: texts
    });

    console.log('Response status:', response.status);
    console.log('Successful API response:', response);
    
    return response;
  } catch (error) {
    console.error('Error getting embeddings:', error);
    throw error;
  }
} 