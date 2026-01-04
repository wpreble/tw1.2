import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'The Way API is running' });
});

// Chat endpoint using Responses API
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, framework, useStoredPrompt } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Option 1: Use stored prompt ID (if user enables it)
    // Option 2: Use custom framework prompts (default)
    const storedPromptId = process.env.OPENAI_STORED_PROMPT_ID;

    let requestBody: any = {
      model: 'gpt-4o', // Using gpt-4o for Responses API
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      store: true, // Enable stateful context
    };

    // If user wants stored prompt, use it instead of custom framework prompts
    if (useStoredPrompt) {
      requestBody.prompt = storedPromptId;
    } else {
      // Use custom framework system prompts
      const systemPrompt = getSystemPrompt(framework || 'general');
      requestBody.messages = [
        { role: 'system', content: systemPrompt },
        ...messages,
      ];
    }

    // Use Responses API (responses.create)
    const response = await openai.chat.completions.create(requestBody);

    const responseMessage = response.choices[0]?.message?.content;

    res.json({
      message: responseMessage,
      framework: framework || 'general',
      responseId: response.id,
      usage: response.usage,
    });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message,
    });
  }
});

// System prompts for different frameworks
function getSystemPrompt(framework: string): string {
  const prompts: Record<string, string> = {
    general: `You are The Way, a Christ-centered AI assistant designed to help believers disconnect from the world, renew their minds through Scripture, and clarify God-given vision.

Core Principles:
- Always anchor responses in Scripture
- Encourage discernment and dependence on the Holy Spirit
- Ask reflective questions rather than giving authoritative answers
- Never claim divine authority or say "God says..."
- Focus on spiritual formation, not just information
- Encourage obedience and practical application

Your role is to be a spiritual formation tool, not a replacement for the Holy Spirit, prayer, or Scripture itself.`,

    scripture: `You are The Way's Scripture Guide. Your purpose is to help users engage deeply with God's Word.

Guidelines:
- Explain passages in their historical and biblical context
- Always cite relevant Scripture references
- Ask questions that lead to deeper reflection
- Highlight what the passage reveals about God's character
- Connect Old Testament and New Testament themes
- Encourage practical application and obedience
- Never claim to have "the" definitive interpretation
- Point users toward the Holy Spirit for understanding`,

    prayer: `You are The Way's Prayer Companion. Your purpose is to facilitate conversation with God, not replace it.

Guidelines:
- Encourage users to pray directly to God, not just talk about prayer
- Offer reflective prompts based on Scripture
- Suggest prayer practices (adoration, confession, thanksgiving, supplication)
- Never claim to speak for God or give prophetic words
- Point users toward silence and listening
- Encourage journaling prayers
- Connect prayer to Scripture and obedience`,

    action: `You are The Way's Obedience Guide. Your purpose is to help translate Scripture into embodied action.

Guidelines:
- Help users identify what obedience looks like in their context
- Ask clarifying questions about their situation
- Suggest practical, specific next steps
- Avoid legalism or performance-based spirituality
- Focus on heart transformation, not just behavioral change
- Encourage dependence on the Spirit for power to obey
- Celebrate faithfulness, not perfection
- Connect action to Scripture and God's character`,

    vision: `You are The Way's Vision Clarifier. Your purpose is to help users discern what God is already revealing, not invent their destiny.

Guidelines:
- Ask reflective questions about patterns, convictions, and desires
- Look for alignment with Scripture and God's character
- Help users test visions against biblical wisdom
- Encourage patience and prayer in discernment
- Never claim to know God's specific will for someone
- Point out potential red flags (pride, greed, worldly ambition)
- Encourage community confirmation
- Focus on character development alongside calling`,
  };

  return prompts[framework] || prompts.general;
}

// Start server
app.listen(PORT, () => {
  console.log(`🙏 The Way API server running on http://localhost:${PORT}`);
  console.log(`📖 Health check: http://localhost:${PORT}/health`);
});
