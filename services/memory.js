// services/memory.js
const conversations = new Map();

/**
 * Store conversation history for each user
 */
export const Memory = {
  /**
   * Add a message to conversation history
   * @param {string} userId - User identifier
   * @param {string} role - "user" or "assistant"
   * @param {string} content - Message content
   */
  addMessage(userId, role, content) {
    if (!conversations.has(userId)) {
      conversations.set(userId, []);
    }

    const history = conversations.get(userId);
    history.push({ role, content });

    // Keep only last 10 messages for context
    if (history.length > 10) {
      history.shift();
    }
  },

  /**
   * Get conversation history for a user
   * @param {string} userId - User identifier
   * @returns {Array} Conversation history
   */
  getHistory(userId) {
    return conversations.get(userId) || [];
  },
};
