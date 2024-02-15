import dotenv from 'dotenv';
import OpenAIApi from 'openai';
import debug from 'debug';

dotenv.config();

const log = debug('@vonage.openai');

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const chatCompletion = await openai.chat.completions.create(
      {
        model: 'gpt-3.5-turbo',
        temperature: 1.5,
        messages: messages,
      },
      {
        timeout: timeout,
      },
    );

    log('Call to GPT complete', JSON.stringify(chatCompletion, null, 2));
    const content = chatCompletion.choices[0].message.content;
    log(content);
    return content;
  } catch (error) {
    log(error);
    console.error('Failed to call GPT');
    console.error(error.message);
  }
};

