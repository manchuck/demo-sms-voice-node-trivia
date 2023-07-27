import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import debug from 'debug';

dotenv.config();

const log = debug('@vonage.openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Call chat GPT
 */
export const callGPT = async (
  messages,
  timeout = 45000,
) => {
  log('Calling ChatGPT');
  try {
    log(messages);

    const chatCompletion = await openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        temperature: 1.5,
        messages: messages,
      },
      {
        timeout: timeout,
      },
    );

    log('Call to GPT complete');
    const content = chatCompletion.data.choices[0].message.content;
    log(content);
    return content;
  } catch (error) {
    log(error);
    console.error('Failed to call GPT');
    console.error(error.message);
  }
};

