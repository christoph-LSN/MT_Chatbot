/**
 * MT Chatbot - AI-powered chatbot widget
 * Powered by Hugging Face Inference API
 */

const MTChatbot = (() => {
  let config = {
    apiKey: '',
    model: 'mistralai/Mistral-7B-Instruct-v0.1',
    position: 'bottom-right',
    title: 'Chat with AI',
    placeholder: 'Ask me anything...',
    theme: 'light'
  };

  let conversationHistory = [];
  let isOpen = false;
  let isLoading = false;

  /**
   * Initialize the chatbot
   */
  function init(options) {
    config = { ...config, ...options };

    if (!config.apiKey) {
      console.error('MT Chatbot: API key is required');
      return;
    }

    createWidget();
    attachEventListeners();
  }

  /**
   * Create the chat widget HTML
   */
  function createWidget() {
    const widgetHTML = `
      <div id="mt-chatbot-widget" class="mt-chatbot-widget mt-chatbot-${config.position}">
        <div class="mt-chatbot-header">
          <span class="mt-chatbot-title">${config.title}</span>
          <button class="mt-chatbot-close" id="mt-chatbot-close">×</button>
        </div>
        <div class="mt-chatbot-messages" id="mt-chatbot-messages"></div>
        <div class="mt-chatbot-input-area">
          <input 
            type="text" 
            id="mt-chatbot-input" 
            class="mt-chatbot-input" 
            placeholder="${config.placeholder}"
            autocomplete="off"
          />
          <button class="mt-chatbot-send" id="mt-chatbot-send">Send</button>
        </div>
      </div>
      <button class="mt-chatbot-toggle mt-chatbot-${config.position}" id="mt-chatbot-toggle">
        💬
      </button>
    `;

    const container = document.createElement('div');
    container.id = 'mt-chatbot-container';
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    const toggleBtn = document.getElementById('mt-chatbot-toggle');
    const closeBtn = document.getElementById('mt-chatbot-close');
    const sendBtn = document.getElementById('mt-chatbot-send');
    const input = document.getElementById('mt-chatbot-input');

    toggleBtn.addEventListener('click', toggleWidget);
    closeBtn.addEventListener('click', closeWidget);
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  /**
   * Toggle widget visibility
   */
  function toggleWidget() {
    const widget = document.getElementById('mt-chatbot-widget');
    isOpen = !isOpen;
    widget.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) {
      document.getElementById('mt-chatbot-input').focus();
      scrollToBottom();
    }
  }

  /**
   * Close widget
   */
  function closeWidget() {
    const widget = document.getElementById('mt-chatbot-widget');
    isOpen = false;
    widget.style.display = 'none';
  }

  /**
   * Send message to chatbot
   */
  async function sendMessage() {
    const input = document.getElementById('mt-chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to UI
    addMessage(message, 'user');
    input.value = '';
    isLoading = true;

    try {
      // Call Hugging Face API
      const response = await callHuggingFaceAPI(message);
      addMessage(response, 'bot');
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: response });
    } catch (error) {
      console.error('MT Chatbot Error:', error);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    } finally {
      isLoading = false;
    }
  }

  /**
   * Call Hugging Face Inference API
   */
  async function callHuggingFaceAPI(message) {
    const API_URL = `https://api-inference.huggingface.co/models/${config.model}`;

    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${config.apiKey}` },
      method: 'POST',
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_length: 256,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();

    // Handle different response formats
    if (Array.isArray(result) && result[0]?.generated_text) {
      return result[0].generated_text.replace(message, '').trim();
    }

    return result.generated_text || 'Unable to process response';
  }

  /**
   * Add message to chat window
   */
  function addMessage(text, sender) {
    const messagesDiv = document.getElementById('mt-chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `mt-chatbot-message mt-chatbot-${sender}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
  }

  /**
   * Scroll to bottom of messages
   */
  function scrollToBottom() {
    const messagesDiv = document.getElementById('mt-chatbot-messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  /**
   * Public API
   */
  return {
    init,
    toggleWidget,
    closeWidget,
    addMessage
  };
})();

// Auto-initialize if script has data attributes
if (document.currentScript?.dataset.apiKey) {
  MTChatbot.init({
    apiKey: document.currentScript.dataset.apiKey,
    model: document.currentScript.dataset.model || 'mistralai/Mistral-7B-Instruct-v0.1',
    position: document.currentScript.dataset.position || 'bottom-right'
  });
}