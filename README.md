# MT Chatbot

An AI-powered chatbot widget for the MT_Site project, built with Hugging Face Inference API.

## Features

- 🤖 AI-powered conversations using Hugging Face API
- 💬 Floating chat widget
- 🎨 Customizable styling
- 📱 Responsive design
- 🔧 Easy integration into GitHub Pages sites
- ⚡ Lightweight and fast

## Technologies

- **Hugging Face Inference API** - AI model inference
- **Vanilla JavaScript** - No dependencies
- **HTML/CSS** - Minimal styling

## Quick Start

### 1. Get a Hugging Face API Key

1. Sign up at [Hugging Face](https://huggingface.co)
2. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
3. Create a new token with `read` access
4. Copy your token

### 2. Integration

Add the following to your GitHub Pages site (e.g., `_includes/chatbot.html`):

```html
<script src="https://cdn.jsdelivr.net/gh/christoph-LSN/MT_Chatbot@main/chatbot.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/christoph-LSN/MT_Chatbot@main/chatbot.css">

<script>
  MTChatbot.init({
    apiKey: 'YOUR_HUGGING_FACE_API_KEY',
    model: 'mistralai/Mistral-7B-Instruct-v0.1',
    position: 'bottom-right'
  });
</script>
```

### 3. Recommended Models

- **Mistral-7B-Instruct** (Fast & Good Quality)
- **Zephyr-7B-Beta** (Conversational)
- **Llama-2-7B-Chat** (General Purpose)

## File Structure

```
MT_Chatbot/
├── chatbot.js          # Main chatbot logic
├── chatbot.css         # Styling
├── config.example.json # Configuration template
├── README.md           # Documentation
└── index.html          # Demo page
```

## Configuration

See `config.example.json` for available options.

## Security

⚠️ **Important:** Never commit your API key to the repository. Use environment variables or pass it securely.

## License

MIT

## Support

For issues and questions, please create an issue in this repository.