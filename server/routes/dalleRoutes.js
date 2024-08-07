import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((_, res) => res.send('Hello from DALL-E!'));

router.route('/').post(async ({ body: { prompt } }, res) => {
  try {
    const aiResponse = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });

    res.status(200).json({ photo: aiResponse.data[0].b64_json });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
