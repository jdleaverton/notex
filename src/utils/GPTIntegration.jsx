import axios from 'axios';

class GPTIntegration {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiURL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  }

  async getSmartSuggestions(prompt) {
    const response = await axios.post(
      this.apiURL,
      {
        prompt,
        max_tokens: 60,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    return response.data.choices[0].text.trim();
  }

  async getSummarization(text) {
    const response = await axios.post(
      this.apiURL,
      {
        prompt: `Summarize the following text: ${text}`,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    return response.data.choices[0].text.trim();
  }
}

export default new GPTIntegration();
