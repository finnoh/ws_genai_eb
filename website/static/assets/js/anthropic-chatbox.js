/**
 * Anthropic Chatbox Component for Reveal.js Slides
 * Provides interactive chat interface for sending prompts to Anthropic API
 */

class AnthropicChatbox {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    // Use proxy server for local development (handles CORS)
    // Proxy runs on http://localhost:3001
    this.useProxy = options.useProxy !== false; // Default to true
    this.proxyUrl = options.proxyUrl || 'http://localhost:3001/api/anthropic/chat';
    // Direct API (fallback if proxy not available)
    this.apiKey = options.apiKey || '';
    this.apiUrl = options.apiUrl || 'https://api.anthropic.com/v1/messages';
    this.defaultModel = options.defaultModel || 'claude-haiku-4-5';
    this.defaultPrompt = options.defaultPrompt || '';
    this.systemPrompt = options.systemPrompt || '';
    // assisted by Cursor AI
    this.enableWebSearch = options.enableWebSearch || false;
    
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }
    
    this.init();
  }
  
  init() {
    this.createChatbox();
    this.createResponseArea();
    this.attachEventListeners();
  }
  
  formatPrompt(promptText) {
    if (!promptText || promptText.trim() === '') {
      return '';
    }
    
    // Parse prompt text to identify sections
    // Look for patterns like "Goal:", "Return Format:", "Warnings:", "Context:"
    // Also handle variations like "WARNING:", "Context:", etc.
    const sections = [];
    
    // Try to find Goal section (first line or after intro)
    const goalRegex = /(?:^|\n)\s*(?:Goal|GOAL):\s*(.+?)(?=\n\s*(?:Return Format|Return|Warnings?|WARNING|Context Dump|Context|CONTEXT DUMP|CONTEXT|$))/is;
    const goalMatch = promptText.match(goalRegex);
    
    // Try to find Return Format section
    const returnFormatRegex = /(?:^|\n)\s*(?:Return Format|Return|RETURN FORMAT):\s*(.+?)(?=\n\s*(?:Warnings?|WARNING|Context Dump|Context|CONTEXT DUMP|CONTEXT|$))/is;
    const returnFormatMatch = promptText.match(returnFormatRegex);
    
    // Try to find Warnings section
    const warningsRegex = /(?:^|\n)\s*(?:Warnings?|WARNING):\s*(.+?)(?=\n\s*(?:Context Dump|Context|CONTEXT DUMP|CONTEXT|$))/is;
    const warningsMatch = promptText.match(warningsRegex);
    
    // Try to find Context section (usually last) - also handles "Context Dump"
    const contextRegex = /(?:^|\n)\s*(?:Context Dump|Context|CONTEXT DUMP|CONTEXT):\s*(.+?)$/is;
    const contextMatch = promptText.match(contextRegex);
    
    // If we find structured sections, format them
    if (goalMatch || returnFormatMatch || warningsMatch || contextMatch) {
      if (goalMatch) {
        sections.push({
          type: 'goal',
          label: 'Goal',
          content: goalMatch[1].trim()
        });
      }
      
      if (returnFormatMatch) {
        sections.push({
          type: 'return-format',
          label: 'Return Format',
          content: returnFormatMatch[1].trim()
        });
      }
      
      if (warningsMatch) {
        sections.push({
          type: 'warnings',
          label: 'Warnings',
          content: warningsMatch[1].trim()
        });
      }
      
      if (contextMatch) {
        // Check if it's "Context Dump" or just "Context"
        const isContextDump = /Context Dump|CONTEXT DUMP/i.test(contextMatch[0]);
        sections.push({
          type: 'context',
          label: isContextDump ? 'Context Dump' : 'Context',
          content: contextMatch[1].trim()
        });
      }
      
      // Format sections with colored borders
      return sections.map(section => {
        return `<div class="prompt-section prompt-${section.type}">
          <div class="prompt-section-label">${section.label}</div>
          <div class="prompt-section-content">${this.escapeHtml(section.content).replace(/\n/g, '<br>')}</div>
        </div>`;
      }).join('');
    }
    
    // If no structured sections found, display as plain text
    return `<div class="prompt-section-content">${this.escapeHtml(promptText).replace(/\n/g, '<br>')}</div>`;
  }
  
  createChatbox() {
    const formattedPrompt = this.formatPrompt(this.defaultPrompt);
    
    // Create unique IDs for this chatbox instance
    // assisted by Cursor AI
    const iUniquePrefix = this.container.id || `chatbox-${Math.random().toString(36).substr(2, 9)}`;
    this.iModelSelectId = `${iUniquePrefix}-model-select`;
    this.iPromptInputId = `${iUniquePrefix}-prompt-input`;
    this.iSendButtonId = `${iUniquePrefix}-send-button`;
    this.iClearButtonId = `${iUniquePrefix}-clear-button`;
    this.iResponseAreaId = `${iUniquePrefix}-response-area`;
    this.iResponseContentId = `${iUniquePrefix}-response-content`;
    this.iClearResponseButtonId = `${iUniquePrefix}-clear-response-button`;
    this.iWebSearchCheckboxId = `${iUniquePrefix}-web-search-checkbox`;
    
    // assisted by Cursor AI
    const sWebSearchCheckbox = `
      <label class="web-search-toggle" for="${this.iWebSearchCheckboxId}">
        <input 
          type="checkbox" 
          id="${this.iWebSearchCheckboxId}" 
          class="web-search-checkbox"
          ${this.enableWebSearch ? 'checked' : ''}
        />
        <span class="web-search-label">🌐 Web Search</span>
      </label>
    `;
    
    const chatboxHTML = `
      <div class="anthropic-chatbox">
        <div class="chatbox-header">
          <label for="${this.iModelSelectId}">Model:</label>
          <select id="${this.iModelSelectId}" class="model-select">
            <option value="claude-haiku-4-5">Claude Haiku 4.5</option>
          </select>
          ${sWebSearchCheckbox}
        </div>
        <div 
          id="${this.iPromptInputId}" 
          class="prompt-input formatted-prompt" 
          contenteditable="true"
          data-placeholder="Enter your prompt here... (Press Enter to send, Shift+Enter for new line)"
        >${formattedPrompt}</div>
        <div class="chatbox-actions">
          <button id="${this.iSendButtonId}" class="send-button">
            <span class="button-text">Send</span>
            <span class="loading-spinner" style="display: none;">⏳</span>
          </button>
          <button id="${this.iClearButtonId}" class="clear-button">Clear</button>
        </div>
      </div>
      <div id="${this.iResponseAreaId}" class="response-area" style="display: none;">
        <div class="response-header">
          <span class="response-label">Response:</span>
          <button id="${this.iClearResponseButtonId}" class="clear-response-button" title="Clear response">×</button>
        </div>
        <div id="${this.iResponseContentId}" class="response-content"></div>
      </div>
    `;
    
    this.container.innerHTML = chatboxHTML;
    this.promptInput = document.getElementById(this.iPromptInputId);
    this.sendButton = document.getElementById(this.iSendButtonId);
    this.clearButton = document.getElementById(this.iClearButtonId);
    this.modelSelect = document.getElementById(this.iModelSelectId);
    // assisted by Cursor AI
    this.webSearchCheckbox = document.getElementById(this.iWebSearchCheckboxId);
    this.loadingSpinner = this.sendButton.querySelector('.loading-spinner');
    this.buttonText = this.sendButton.querySelector('.button-text');
    this.responseArea = document.getElementById(this.iResponseAreaId);
    this.responseContent = document.getElementById(this.iResponseContentId);
    this.clearResponseButton = document.getElementById(this.iClearResponseButtonId);
    
    // Set default model
    this.modelSelect.value = this.defaultModel;
    
    // Handle placeholder for contenteditable
    this.updatePlaceholder();
    this.promptInput.addEventListener('input', () => this.updatePlaceholder());
    this.promptInput.addEventListener('focus', () => this.updatePlaceholder());
    this.promptInput.addEventListener('blur', () => this.updatePlaceholder());
  }
  
  updatePlaceholder() {
    const placeholder = this.promptInput.getAttribute('data-placeholder');
    if (this.promptInput.textContent.trim() === '') {
      this.promptInput.setAttribute('data-empty', 'true');
    } else {
      this.promptInput.removeAttribute('data-empty');
    }
  }
  
  createResponseArea() {
    // Response area is already created in createChatbox()
    // Just set up the clear button handler
    if (this.clearResponseButton) {
      this.clearResponseButton.addEventListener('click', () => this.clearResponse());
    }
  }
  
  attachEventListeners() {
    // Send button
    this.sendButton.addEventListener('click', () => this.sendPrompt());
    
    // Clear button
    this.clearButton.addEventListener('click', () => this.clearPrompt());
    
    // Clear response button
    if (this.clearResponseButton) {
      this.clearResponseButton.addEventListener('click', () => this.clearResponse());
    }
    
    // Enter key to send (Shift+Enter for new line)
    this.promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendPrompt();
      }
    });
  }
  
  async sendPrompt() {
    // Extract text content from contenteditable div
    const prompt = this.promptInput.textContent.trim();
    const model = this.modelSelect.value;
    // assisted by Cursor AI
    const bWebSearchEnabled = this.webSearchCheckbox ? this.webSearchCheckbox.checked : false;
    
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
    
    // Show loading state
    this.setLoading(true);
    
    try {
      let responseText;
      
      // Use proxy server if enabled (handles CORS for local files)
      if (this.useProxy) {
        // assisted by Cursor AI
        const requestBody = {
          prompt: prompt,
          model: model
        };
        
        // Add system prompt if provided
        if (this.systemPrompt) {
          requestBody.systemPrompt = this.systemPrompt;
        }
        
        // Add web search if checkbox is checked
        if (bWebSearchEnabled) {
          requestBody.enableWebSearch = true;
        }
        
        const response = await fetch(this.proxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          const errorMsg = data.error || 'Failed to get response from proxy server';
          throw new Error(errorMsg);
        }
        
        responseText = data.response;
      } else {
        // Direct API call (may fail due to CORS)
        // assisted by Cursor AI
        const requestBody = {
          model: model,
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        };
        
        // Add system prompt if provided
        if (this.systemPrompt) {
          requestBody.system = this.systemPrompt;
        }
        
        // Add web search tool if checkbox is checked
        // assisted by Cursor AI
        if (bWebSearchEnabled) {
          requestBody.tools = [{
            type: 'web_search_20250305',
            name: 'web_search',
            max_uses: 5
          }];
        }
        
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          const errorMsg = data.error?.message || data.error || 'Failed to get response';
          throw new Error(errorMsg);
        }
        
        // Extract text content from Anthropic's response format
        responseText = data.content
          .filter(block => block.type === 'text')
          .map(block => block.text)
          .join('\n');
      }
      
      this.showResponse(responseText);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = error.message;
      
      // Provide helpful error message if proxy connection fails
      if (this.useProxy && (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage === 'Failed to fetch')) {
        errorMessage = 'Could not connect to API proxy server.\n\n' +
          'To fix this:\n' +
          '1. Open a terminal in the project directory\n' +
          '2. Run: cd api-proxy && npm start\n' +
          '3. Ensure your .env file contains ANTHROPIC_API_KEY\n' +
          '4. Refresh this page and try again\n\n' +
          'The proxy server should run on http://localhost:3001';
      }
      
      this.showError(errorMessage);
    } finally {
      this.setLoading(false);
    }
  }
  
  // Check if proxy server is available
  async checkProxyHealth() {
    try {
      const healthUrl = this.proxyUrl.replace('/api/anthropic/chat', '/health');
      const response = await fetch(healthUrl, { method: 'GET' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  setLoading(loading) {
    if (loading) {
      this.sendButton.disabled = true;
      this.loadingSpinner.style.display = 'inline';
      this.buttonText.textContent = 'Sending...';
    } else {
      this.sendButton.disabled = false;
      this.loadingSpinner.style.display = 'none';
      this.buttonText.textContent = 'Send';
    }
  }
  
  showResponse(response) {
    // Convert markdown to HTML with better rendering
    const html = this.markdownToHtml(response);
    this.responseContent.innerHTML = html;
    this.responseArea.style.display = 'block';
    
    // Scroll response area into view
    this.responseArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Re-initialize reveal.js if available (for syntax highlighting, etc.)
    if (typeof Reveal !== 'undefined' && Reveal.sync) {
      Reveal.sync();
    }
  }
  
  showError(errorMessage) {
    this.responseContent.innerHTML = `
      <div class="error-message">
        <strong>Error:</strong> ${this.escapeHtml(errorMessage)}
        <br><br>
        <small>Check your API key and internet connection</small>
      </div>
    `;
    this.responseArea.style.display = 'block';
  }
  
  clearResponse() {
    this.responseContent.innerHTML = '';
    this.responseArea.style.display = 'none';
  }
  
  clearPrompt() {
    this.promptInput.innerHTML = '';
    this.promptInput.focus();
    this.updatePlaceholder();
  }
  
  // Enhanced markdown to HTML converter
  markdownToHtml(markdown) {
    if (!markdown) return '';
    
    // Split into lines for processing
    const lines = markdown.split('\n');
    const result = [];
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockContent = [];
    let inList = false;
    let listItems = [];
    let inTable = false;
    let tableRows = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Code blocks
      const codeBlockMatch = line.match(/^```(\w+)?$/);
      if (codeBlockMatch) {
        if (inCodeBlock) {
          // Close code block
          result.push(`<pre><code class="language-${codeBlockLang}">${this.escapeHtml(codeBlockContent.join('\n'))}</code></pre>`);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
        } else {
          // Open code block
          inCodeBlock = true;
          codeBlockLang = codeBlockMatch[1] || '';
        }
        continue;
      }
      
      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }
      
      // Horizontal rule (---)
      if (line.trim().match(/^---+$/)) {
        result.push('<hr>');
        continue;
      }
      
      // Tables - check if line looks like a table row (contains |)
      const tableRowMatch = line.match(/^\s*\|.+\|\s*$/);
      const tableSeparatorMatch = line.match(/^\s*\|[\s\-:|]+\|\s*$/);
      
      if (tableRowMatch || tableSeparatorMatch) {
        if (tableSeparatorMatch) {
          // This is a separator row, skip it but mark that we're in a table
          if (tableRows.length > 0) {
            inTable = true;
          }
          continue;
        }
        
        if (tableRowMatch) {
          // Parse table row - split by | and filter empty cells at start/end
          const parts = line.split('|');
          // Remove first and last if they're empty (from leading/trailing |)
          const cells = parts.slice(parts[0].trim() === '' ? 1 : 0, 
                                     parts[parts.length - 1].trim() === '' ? -1 : undefined)
                          .map(cell => cell.trim());
          if (cells.length > 0) {
            tableRows.push(cells);
            inTable = true;
            continue;
          }
        }
      } else if (inTable) {
        // End of table
        if (tableRows.length > 0) {
          result.push(this.renderTable(tableRows));
          tableRows = [];
        }
        inTable = false;
      }
      
      // Headers
      if (line.match(/^###\s/)) {
        result.push(`<h3>${this.escapeHtml(line.replace(/^###\s+/, ''))}</h3>`);
        continue;
      }
      if (line.match(/^##\s/)) {
        result.push(`<h2>${this.escapeHtml(line.replace(/^##\s+/, ''))}</h2>`);
        continue;
      }
      if (line.match(/^#\s/)) {
        result.push(`<h1>${this.escapeHtml(line.replace(/^#\s+/, ''))}</h1>`);
        continue;
      }
      
      // Lists
      const listMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
      if (listMatch) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        listItems.push(listMatch[1]);
        continue;
      } else if (inList) {
        // Close list
        result.push(`<ul>${listItems.map(item => `<li>${this.processInlineMarkdown(item)}</li>`).join('')}</ul>`);
        listItems = [];
        inList = false;
      }
      
      // Empty line - close any open paragraph
      if (line.trim() === '') {
        if (result.length > 0) {
          const lastItem = result[result.length - 1];
          if (lastItem.startsWith('<p>') && !lastItem.endsWith('</p>')) {
            result[result.length - 1] = lastItem + '</p>';
          }
        }
        continue;
      }
      
      // Regular paragraph
      if (line.trim()) {
        const lastItem = result.length > 0 ? result[result.length - 1] : '';
        if (lastItem === '' || lastItem.endsWith('</p>') || 
            lastItem.endsWith('</h1>') || 
            lastItem.endsWith('</h2>') || 
            lastItem.endsWith('</h3>') ||
            lastItem.endsWith('</h4>') ||
            lastItem.endsWith('</h5>') ||
            lastItem.endsWith('</h6>') ||
            lastItem.endsWith('</ul>') ||
            lastItem.endsWith('</ol>') ||
            lastItem.endsWith('</pre>') ||
            lastItem.endsWith('</table>') ||
            lastItem.endsWith('<hr>')) {
          result.push(`<p>${this.processInlineMarkdown(line)}</p>`);
        } else if (lastItem.startsWith('<p>') && !lastItem.endsWith('</p>')) {
          result[result.length - 1] = lastItem + ' ' + this.processInlineMarkdown(line) + '</p>';
        } else {
          result.push(`<p>${this.processInlineMarkdown(line)}</p>`);
        }
      }
    }
    
    // Close any open tags
    if (inList && listItems.length > 0) {
      result.push(`<ul>${listItems.map(item => `<li>${this.processInlineMarkdown(item)}</li>`).join('')}</ul>`);
    }
    if (inCodeBlock && codeBlockContent.length > 0) {
      result.push(`<pre><code class="language-${codeBlockLang}">${this.escapeHtml(codeBlockContent.join('\n'))}</code></pre>`);
    }
    if (inTable && tableRows.length > 0) {
      result.push(this.renderTable(tableRows));
    }
    
    return result.join('\n');
  }
  
  // Render markdown table to HTML
  renderTable(rows) {
    if (rows.length === 0) return '';
    
    let html = '<table>';
    
    // First row is header
    if (rows.length > 0) {
      html += '<thead><tr>';
      rows[0].forEach(cell => {
        html += `<th>${this.processInlineMarkdown(cell)}</th>`;
      });
      html += '</tr></thead>';
    }
    
    // Remaining rows are body
    if (rows.length > 1) {
      html += '<tbody>';
      for (let i = 1; i < rows.length; i++) {
        html += '<tr>';
        rows[i].forEach(cell => {
          html += `<td>${this.processInlineMarkdown(cell)}</td>`;
        });
        html += '</tr>';
      }
      html += '</tbody>';
    }
    
    html += '</table>';
    return html;
  }
  
  // Process inline markdown (bold, italic, code, links)
  processInlineMarkdown(text) {
    if (!text) return '';
    
    // Protect code blocks first
    const codePlaceholders = [];
    let placeholderIndex = 0;
    text = text.replace(/`([^`]+)`/g, (match, code) => {
      const placeholder = `__CODE_${placeholderIndex}__`;
      codePlaceholders.push(`<code>${this.escapeHtml(code)}</code>`);
      placeholderIndex++;
      return placeholder;
    });
    
    // Escape HTML
    text = this.escapeHtml(text);
    
    // Restore code placeholders
    codePlaceholders.forEach((code, index) => {
      text = text.replace(`__CODE_${index}__`, code);
    });
    
    // Bold (must come before italic to avoid conflicts)
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Italic - use underscore or single asterisk (not part of bold)
    // First try underscore notation
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
    // Then single asterisk (not part of **bold**)
    text = text.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');
    
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    
    return text;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Helper function to check proxy health
async function checkProxyHealth(proxyUrl) {
  try {
    const healthUrl = proxyUrl.replace('/api/anthropic/chat', '/health');
    const response = await fetch(healthUrl, { method: 'GET' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Store chatbox instances to prevent duplicates
// assisted by Cursor AI
const ddChatboxInstances = {};

// Initialize chatboxes when DOM is ready and on reveal.js slide changes
async function initializeChatboxes() {
  // Auto-initialize chatboxes with data attributes
  const chatboxElements = document.querySelectorAll('[data-chatbox]');
  
  // Check proxy health if using proxy (check once for all chatboxes)
  const defaultProxyUrl = 'http://localhost:3001/api/anthropic/chat';
  let proxyAvailable = false;
  if (chatboxElements.length > 0) {
    proxyAvailable = await checkProxyHealth(defaultProxyUrl);
    if (!proxyAvailable) {
      console.warn('API proxy server not available. Chatboxes will show connection errors. Start the proxy with: cd api-proxy && npm start');
    }
  }
  
  chatboxElements.forEach(el => {
    // Skip if already initialized
    if (el.dataset.initialized === 'true') return;
    
    const chatboxId = el.getAttribute('data-chatbox') || el.id || `chatbox-${Math.random().toString(36).substr(2, 9)}`;
    const defaultPrompt = el.getAttribute('data-prompt') || '';
    const defaultModel = el.getAttribute('data-model') || 'claude-haiku-4-5';
    const systemPrompt = el.getAttribute('data-system-prompt') || '';
    // assisted by Cursor AI
    const enableWebSearch = el.getAttribute('data-web-search') === 'true';
    
    // Ensure the container has an ID
    if (!el.id) {
      el.id = chatboxId;
    }
    
    try {
      // Use proxy by default, but allow disabling via data attribute
      const useProxy = el.getAttribute('data-use-proxy') !== 'false';
      
      // Create new instance and store it
      const iChatboxInstance = new AnthropicChatbox(chatboxId, {
        defaultPrompt,
        defaultModel,
        systemPrompt,
        enableWebSearch,
        useProxy: useProxy && proxyAvailable, // Only use proxy if it's available
        apiKey: el.getAttribute('data-api-key') || undefined, // Use embedded key if not specified
        apiUrl: el.getAttribute('data-api-url') || undefined // Use default Anthropic API if not specified
      });
      
      ddChatboxInstances[chatboxId] = iChatboxInstance;
      el.dataset.initialized = 'true';
    } catch (error) {
      console.error('Error initializing chatbox:', error);
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeChatboxes);

// Re-initialize on reveal.js slide changes (if reveal.js is available)
if (typeof Reveal !== 'undefined') {
  Reveal.addEventListener('slidechanged', () => {
    // Small delay to ensure DOM is updated
    setTimeout(initializeChatboxes, 100);
  });
  
  // Also initialize on ready
  Reveal.addEventListener('ready', initializeChatboxes);
}

// Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnthropicChatbox;
}
