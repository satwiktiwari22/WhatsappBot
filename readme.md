# WhatsApp Bot

A smart WhatsApp chatbot that simulates natural conversation using AI. The bot responds to messages, maintains conversation memory, and mimics casual friendly texting style.

## Overview

This WhatsApp bot integrates OpenAI's GPT models with WhatsApp Web to create an automated messaging experience. It can:

- Respond to messages from specific WhatsApp numbers
- Remember conversation context for natural replies
- Simulate casual texting with emojis and informal language
- Handle multiple users simultaneously

## Requirements

- Node.js v16 or higher
- A WhatsApp account
- An OpenAI API key or Azure OpenAI endpoint

## Setup

1. **Clone the repository:**

```bash
git clone https://github.com/satwiktiwari22/WhatsappBot.git
cd WhatsappBot
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a .env file in the root directory with the following:

```properties
# OpenAI API Key or Azure OpenAI API Key
OPENAI_API_KEY=your_api_key_here

# List of WhatsApp numbers to respond to (with @c.us suffix)
TARGET_NUMBERS=911234567890@c.us,919876543210@c.us

# Client ID for session persistence
CLIENT_ID=smart-bot

# OpenAI API endpoint (use this for Azure OpenAI)
BASE_URL=https://your-resource.openai.azure.com
```

4. **Start the bot:**

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

5. **Link with WhatsApp Web:**

When you start the bot for the first time, it will display a QR code in your terminal. Scan this QR code with WhatsApp on your phone (go to WhatsApp Settings > Linked Devices > Link a Device).

## How It Works

### Architecture

The bot has the following components:

- **index.js**: Main entry point that initializes the WhatsApp client
- **handlers/messageHandler.js**: Processes incoming messages
- **services/ai.js**: Handles AI generation via OpenAI API
- **services/memory.js**: Maintains conversation history

### Message Flow

1. When the bot receives a WhatsApp message, it checks if the sender is in the allowed list (`TARGET_NUMBERS`).
2. If allowed, it shows a "typing" indicator to simulate real human behavior.
3. The message is added to the conversation memory.
4. The bot retrieves conversation history to provide context.
5. It sends the conversation context along with a system prompt to the AI service.
6. The AI generates a natural-sounding response based on the conversation history and the system prompt.
7. The response is sent back to the user and added to the conversation memory.

### Features

- **Memory System**: Remembers previous messages to maintain context
- **Typing Indicators**: Shows typing status to simulate human behavior
- **Error Handling**: Gracefully handles errors without crashing
- **Multi-User Support**: Can respond to multiple WhatsApp numbers

## Customization

### Changing Response Style

Edit the system prompt in messageHandler.js to modify how the bot responds:

```javascript
const systemPrompt = `You are simulating a casual WhatsApp conversation with a close friend.
Reply in a friendly, conversational tone with occasional emojis. Keep it brief like texting.
Use casual language, sometimes with shortened words or text-speak.
Don't be overly formal or robotic. Act like you've known this person for years.`;
```

### Changing AI Model

To use a different AI model, modify the `model` parameter in ai.js:

```javascript
const response = await openai.chat.completions.create({
  model: "your-preferred-model", // e.g., "gpt-4" or "gpt-3.5-turbo"
  messages: messages,
  max_tokens: 150,
  temperature: 0.7,
});
```

## Troubleshooting

### QR Code Not Scanning

- Make sure your phone has a working internet connection
- Restart the bot and try scanning again
- Clear WhatsApp Web cache on your phone

### Authentication Issues

If you encounter authentication errors, delete the .wwebjs_auth directory to start fresh:

```bash
rm -rf .wwebjs_auth
```

### API Errors

- Check your OpenAI API key in the .env file
- Verify your OpenAI account has sufficient credits
- If using Azure OpenAI, check your endpoint URL and resource configuration
