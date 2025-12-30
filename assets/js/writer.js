/**
 * CodeProb - Writer Interface Module
 * Handles content creation, preview, and export functionality
 */

(function() {
    'use strict';

    const Writer = {
        currentTab: 'problem',
        templates: {},

        // Initialize the writer interface
        init: function() {
            this.setupTabs();
            this.setupFormHandlers();
            this.loadTemplates();
        },

        // Setup tab switching functionality
        setupTabs: function() {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabName = button.dataset.tab;
                    
                    // Update active tab button
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Update active tab content
                    tabContents.forEach(content => content.classList.remove('active'));
                    document.getElementById(`${tabName}-tab`).classList.add('active');
                    
                    this.currentTab = tabName;
                });
            });
        },

        // Setup form event handlers
        setupFormHandlers: function() {
            document.getElementById('preview-btn').addEventListener('click', () => {
                this.showPreview();
            });

            document.getElementById('export-btn').addEventListener('click', () => {
                this.exportContent();
            });

            document.getElementById('clear-btn').addEventListener('click', () => {
                this.clearCurrentForm();
            });
            
            // Setup markdown toolbar
            this.setupMarkdownToolbar();
            
            // Setup live preview for article content
            this.setupLivePreview();
        },
        
        // Setup markdown toolbar functionality
        setupMarkdownToolbar: function() {
            const toolbar = document.getElementById('markdown-toolbar');
            if (!toolbar) return;
            
            toolbar.addEventListener('click', (e) => {
                if (e.target.dataset.action) {
                    this.insertMarkdown(e.target.dataset.action);
                }
            });
        },
        
        // Setup live preview for article content
        setupLivePreview: function() {
            const contentTextarea = document.getElementById('article-content');
            const livePreview = document.getElementById('live-preview');
            
            if (contentTextarea && livePreview) {
                contentTextarea.addEventListener('input', () => {
                    const content = contentTextarea.value;
                    livePreview.innerHTML = this.processContent(content);
                });
                
                // Initial render
                livePreview.innerHTML = this.processContent(contentTextarea.value);
            }
        },
        
        // Insert markdown syntax at cursor position
        insertMarkdown: function(action) {
            const textarea = document.getElementById('article-content');
            if (!textarea) return;
            
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = textarea.value.substring(start, end);
            const beforeText = textarea.value.substring(0, start);
            const afterText = textarea.value.substring(end);
            
            let insertText = '';
            let cursorOffset = 0;
            
            switch (action) {
                case 'bold':
                    insertText = `**${selectedText || 'bold text'}**`;
                    cursorOffset = selectedText ? 0 : -9;
                    break;
                case 'italic':
                    insertText = `*${selectedText || 'italic text'}*`;
                    cursorOffset = selectedText ? 0 : -12;
                    break;
                case 'code':
                    insertText = `\`${selectedText || 'code'}\``;
                    cursorOffset = selectedText ? 0 : -5;
                    break;
                case 'link':
                    insertText = `[${selectedText || 'link text'}](url)`;
                    cursorOffset = selectedText ? -4 : -13;
                    break;
                case 'image':
                    insertText = `![${selectedText || 'alt text'}](image-url)`;
                    cursorOffset = selectedText ? -12 : -21;
                    break;
                case 'h1':
                    insertText = `# ${selectedText || 'Heading 1'}`;
                    cursorOffset = selectedText ? 0 : -10;
                    break;
                case 'h2':
                    insertText = `## ${selectedText || 'Heading 2'}`;
                    cursorOffset = selectedText ? 0 : -10;
                    break;
                case 'h3':
                    insertText = `### ${selectedText || 'Heading 3'}`;
                    cursorOffset = selectedText ? 0 : -10;
                    break;
                case 'ul':
                    insertText = `- ${selectedText || 'List item'}`;
                    cursorOffset = selectedText ? 0 : -9;
                    break;
                case 'ol':
                    insertText = `1. ${selectedText || 'List item'}`;
                    cursorOffset = selectedText ? 0 : -9;
                    break;
                case 'quote':
                    insertText = `> ${selectedText || 'Quote'}`;
                    cursorOffset = selectedText ? 0 : -5;
                    break;
                case 'code-block':
                    insertText = `\`\`\`javascript\n${selectedText || 'code here'}\n\`\`\``;
                    cursorOffset = selectedText ? 0 : -13;
                    break;
                case 'highlight':
                    insertText = `==${selectedText || 'highlighted text'}==`;
                    cursorOffset = selectedText ? 0 : -18;
                    break;
                case 'strikethrough':
                    insertText = `~~${selectedText || 'strikethrough'}~~`;
                    cursorOffset = selectedText ? 0 : -15;
                    break;
                case 'hr':
                    insertText = '\n---\n';
                    cursorOffset = 0;
                    break;
            }
            
            textarea.value = beforeText + insertText + afterText;
            
            // Set cursor position
            const newCursorPos = start + insertText.length + cursorOffset;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
            textarea.focus();
            
            // Trigger live preview update
            textarea.dispatchEvent(new Event('input'));
        },

        // Load HTML templates
        loadTemplates: async function() {
            // For local file access, we'll embed templates directly
            this.templates = {
                'problem': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - CodeProb</title>
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
    <header class="site-header">
        <div class="container">
            <h1 class="site-title"><a href="../index.html">CodeProb</a></h1>
            <nav class="main-nav">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="index.html" class="nav-link nav-link--active">Problems</a>
                <a href="../concepts/index.html" class="nav-link">Concepts</a>
                <a href="../articles/index.html" class="nav-link">Articles</a>
                <a href="../writer.html" class="nav-link nav-link--writer">Write</a>
            </nav>
        </div>
    </header>
    <main class="main-content">
        <div class="container">
            <article class="problem" data-id="{{ID}}" data-difficulty="{{DIFFICULTY}}">
                <header>
                    <h1>{{TITLE}}</h1>
                    <div class="metadata">
                        <span class="difficulty">{{DIFFICULTY_DISPLAY}}</span>
                        <span class="topics">{{TOPICS}}</span>
                    </div>
                </header>
                <section class="description">
                    <h2>Problem Description</h2>
                    {{DESCRIPTION}}
                </section>
                <section class="examples">
                    <h2>Examples</h2>
                    {{EXAMPLES}}
                </section>
                {{HINTS_SECTION}}
                <section class="related-links">
                    <h2>Related Content</h2>
                    {{RELATED_LINKS}}
                </section>
            </article>
        </div>
    </main>
    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2025 CodeProb. A static, community-driven platform hosted on GitHub Pages.</p>
        </div>
    </footer>
    <script src="../assets/js/main.js"></script>
</body>
</html>`,
                'concept': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - CodeProb</title>
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
    <header class="site-header">
        <div class="container">
            <h1 class="site-title"><a href="../index.html">CodeProb</a></h1>
            <nav class="main-nav">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../problems/index.html" class="nav-link">Problems</a>
                <a href="index.html" class="nav-link nav-link--active">Concepts</a>
                <a href="../articles/index.html" class="nav-link">Articles</a>
                <a href="../writer.html" class="nav-link nav-link--writer">Write</a>
            </nav>
        </div>
    </header>
    <main class="main-content">
        <div class="container">
            <article class="concept" data-id="{{ID}}" data-category="{{CATEGORY}}">
                <header>
                    <h1>{{TITLE}}</h1>
                    <div class="metadata">
                        <span class="category">{{CATEGORY_DISPLAY}}</span>
                        <span class="difficulty">{{COMPLEXITY_DISPLAY}}</span>
                    </div>
                </header>
                <section class="overview">
                    <h2>Overview</h2>
                    {{OVERVIEW}}
                </section>
                <section class="explanation">
                    <h2>Detailed Explanation</h2>
                    {{EXPLANATION}}
                </section>
                <section class="examples">
                    <h2>Code Examples</h2>
                    {{EXAMPLES}}
                </section>
                <section class="related-problems">
                    <h2>Practice Problems</h2>
                    {{RELATED_PROBLEMS}}
                </section>
            </article>
        </div>
    </main>
    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2025 CodeProb. A static, community-driven platform hosted on GitHub Pages.</p>
        </div>
    </footer>
    <script src="../assets/js/main.js"></script>
</body>
</html>`,
                'article': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - CodeProb</title>
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
    <header class="site-header">
        <div class="container">
            <h1 class="site-title"><a href="../index.html">CodeProb</a></h1>
            <nav class="main-nav">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../problems/index.html" class="nav-link">Problems</a>
                <a href="../concepts/index.html" class="nav-link">Concepts</a>
                <a href="index.html" class="nav-link nav-link--active">Articles</a>
                <a href="../writer.html" class="nav-link nav-link--writer">Write</a>
            </nav>
        </div>
    </header>
    <main class="main-content">
        <div class="container">
            <article class="article" data-id="{{ID}}" data-author="{{AUTHOR_ID}}">
                <header>
                    <h1>{{TITLE}}</h1>
                    <div class="metadata">
                        <span class="author">{{AUTHOR}}</span>
                        <span class="date">{{DATE}}</span>
                        <span class="tags">{{TAGS}}</span>
                    </div>
                </header>
                <section class="content">
                    {{CONTENT}}
                </section>
                <section class="references">
                    <h2>References and Further Reading</h2>
                    {{REFERENCES}}
                </section>
            </article>
        </div>
    </main>
    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2025 CodeProb. A static, community-driven platform hosted on GitHub Pages.</p>
        </div>
    </footer>
    <script src="../assets/js/main.js"></script>
</body>
</html>`
            };
        },

        // Get form data for current tab
        getCurrentFormData: function() {
            const form = document.getElementById(`${this.currentTab}-form`);
            const formData = new FormData(form);
            const data = {};
            
            for (const [key, value] of formData.entries()) {
                data[key] = value.trim();
            }
            
            return data;
        },

        // Validate form data
        validateFormData: function(data) {
            const errors = [];
            
            // Common validations
            if (!data.title) errors.push('Title is required');
            if (!data.author) errors.push('Author is required');
            
            // Type-specific validations
            switch (this.currentTab) {
                case 'problem':
                    if (!data.difficulty) errors.push('Difficulty is required');
                    if (!data.topics) errors.push('Topics are required');
                    if (!data.description) errors.push('Description is required');
                    if (!data.examples) errors.push('Examples are required');
                    break;
                    
                case 'concept':
                    if (!data.category) errors.push('Category is required');
                    if (!data.complexity) errors.push('Complexity is required');
                    if (!data.overview) errors.push('Overview is required');
                    if (!data.explanation) errors.push('Explanation is required');
                    if (!data.examples) errors.push('Examples are required');
                    break;
                    
                case 'article':
                    if (!data.tags) errors.push('Tags are required');
                    if (!data.content) errors.push('Content is required');
                    break;
            }
            
            return errors;
        },

        // Generate unique ID for content
        generateId: function(title) {
            return title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-');
        },

        // Generate filename based on content type and title
        generateFilename: function(title) {
            const id = this.generateId(title);
            
            switch (this.currentTab) {
                case 'problem':
                    return `problem-${id}.html`;
                case 'concept':
                    return `${id}.html`;
                case 'article':
                    return `article-${id}.html`;
                default:
                    return `${id}.html`;
            }
        },

        // Enhanced markdown processor with full GitHub-style support
        processContent: function(content) {
            if (!content) return '';
            
            // Convert full markdown syntax to HTML
            let html = content;
            
            // Code blocks (must be first to avoid conflicts)
            html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
            
            // Inline code
            html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
            
            // Headers
            html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
            html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
            html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
            
            // Bold and italic
            html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
            
            // Links
            html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
            
            // Images
            html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
            
            // Strikethrough
            html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
            
            // Highlight (GitHub style)
            html = html.replace(/==(.*?)==/g, '<mark>$1</mark>');
            
            // Lists
            html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
            html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
            html = html.replace(/^\+ (.*$)/gm, '<li>$1</li>');
            html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
            
            // Wrap consecutive list items in ul/ol
            html = html.replace(/(<li>.*<\/li>)/s, function(match) {
                return '<ul>' + match + '</ul>';
            });
            
            // Blockquotes
            html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
            
            // Horizontal rules
            html = html.replace(/^---$/gm, '<hr>');
            html = html.replace(/^\*\*\*$/gm, '<hr>');
            
            // Line breaks and paragraphs
            html = html.replace(/\n\n/g, '</p><p>');
            html = html.replace(/^(?!<[h|u|p|l|b])/gm, '<p>');
            html = html.replace(/(?<!>)$/gm, '</p>');
            
            // Clean up empty paragraphs and fix nesting
            html = html.replace(/<p><\/p>/g, '');
            html = html.replace(/<p>(<[h|u|b])/g, '$1');
            html = html.replace(/(<\/[h|u|b]>)<\/p>/g, '$1');
            
            return html;
        },

        // Process examples for problems
        processExamples: function(examples) {
            if (!examples) return '';
            
            const exampleBlocks = examples.split(/Example \d+:/);
            let html = '';
            
            exampleBlocks.forEach((block, index) => {
                if (index === 0) return; // Skip first empty block
                
                html += `
                    <div class="example">
                        <h3>Example ${index}:</h3>
                        <pre><code>${block.trim()}</code></pre>
                    </div>
                `;
            });
            
            return html;
        },

        // Process related links
        processRelatedLinks: function(links) {
            if (!links) return '<p>No related content available.</p>';
            
            const linkLines = links.split('\n').filter(line => line.trim());
            let html = '<ul>';
            
            linkLines.forEach(line => {
                const match = line.match(/^\s*[•\-\*]\s*(.+)/);
                if (match) {
                    html += `<li>${match[1]}</li>`;
                }
            });
            
            html += '</ul>';
            return html;
        },

        // Show preview of current content
        showPreview: function() {
            const data = this.getCurrentFormData();
            const errors = this.validateFormData(data);
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n• ' + errors.join('\n• '));
                return;
            }
            
            const previewArea = document.getElementById('preview-area');
            const previewContent = document.getElementById('preview-content');
            
            let html = this.generateHTML(data, true);
            
            // Extract just the article content for preview
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const article = doc.querySelector('article');
            
            if (article) {
                previewContent.innerHTML = article.outerHTML;
            } else {
                previewContent.innerHTML = '<p>Preview not available</p>';
            }
            
            previewArea.classList.add('active');
            previewArea.scrollIntoView({ behavior: 'smooth' });
        },

        // Generate complete HTML from form data
        generateHTML: function(data, isPreview = false) {
            const template = this.templates[this.currentTab];
            if (!template) {
                throw new Error(`Template not found for ${this.currentTab}`);
            }
            
            const id = this.generateId(data.title);
            const currentDate = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            let html = template;
            
            // Common replacements
            html = html.replace(/\{\{TITLE\}\}/g, data.title);
            html = html.replace(/\{\{ID\}\}/g, id);
            html = html.replace(/\{\{AUTHOR\}\}/g, data.author);
            html = html.replace(/\{\{DATE\}\}/g, currentDate);
            
            // Type-specific replacements
            switch (this.currentTab) {
                case 'problem':
                    html = html.replace(/\{\{DIFFICULTY\}\}/g, data.difficulty);
                    html = html.replace(/\{\{DIFFICULTY_DISPLAY\}\}/g, 
                        data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1));
                    html = html.replace(/\{\{TOPICS\}\}/g, data.topics);
                    html = html.replace(/\{\{DESCRIPTION\}\}/g, this.processContent(data.description));
                    html = html.replace(/\{\{EXAMPLES\}\}/g, this.processExamples(data.examples));
                    
                    // Handle optional hints section
                    if (data.hints && data.hints.trim()) {
                        const hintsSection = `
                            <section class="hints" data-optional="true">
                                <h2>Hints</h2>
                                ${this.processContent(data.hints)}
                            </section>
                        `;
                        html = html.replace(/\{\{HINTS_SECTION\}\}/g, hintsSection);
                    } else {
                        html = html.replace(/\{\{HINTS_SECTION\}\}/g, '');
                    }
                    
                    html = html.replace(/\{\{RELATED_LINKS\}\}/g, this.processRelatedLinks(data.related));
                    break;
                    
                case 'concept':
                    html = html.replace(/\{\{CATEGORY\}\}/g, data.category);
                    html = html.replace(/\{\{CATEGORY_DISPLAY\}\}/g, 
                        data.category.charAt(0).toUpperCase() + data.category.slice(1));
                    html = html.replace(/\{\{COMPLEXITY_DISPLAY\}\}/g, 
                        data.complexity.charAt(0).toUpperCase() + data.complexity.slice(1));
                    html = html.replace(/\{\{OVERVIEW\}\}/g, this.processContent(data.overview));
                    html = html.replace(/\{\{EXPLANATION\}\}/g, this.processContent(data.explanation));
                    html = html.replace(/\{\{EXAMPLES\}\}/g, this.processContent(data.examples));
                    html = html.replace(/\{\{RELATED_PROBLEMS\}\}/g, this.processRelatedLinks(data.problems));
                    break;
                    
                case 'article':
                    html = html.replace(/\{\{AUTHOR_ID\}\}/g, this.generateId(data.author));
                    html = html.replace(/\{\{TAGS\}\}/g, data.tags);
                    html = html.replace(/\{\{CONTENT\}\}/g, this.processContent(data.content));
                    html = html.replace(/\{\{REFERENCES\}\}/g, this.processRelatedLinks(data.references));
                    break;
            }
            
            return html;
        },

        // Generate contributor config entry
        generateConfigEntry: function(data) {
            const filename = this.generateFilename(data.title);
            const currentDate = new Date().toISOString().split('T')[0];
            
            const entry = {
                filename: filename,
                title: data.title,
                author: data.author,
                dateAdded: currentDate
            };
            
            // Add type-specific fields
            switch (this.currentTab) {
                case 'problem':
                    entry.difficulty = data.difficulty;
                    entry.topics = data.topics.split(',').map(t => t.trim());
                    break;
                    
                case 'concept':
                    entry.category = data.category;
                    entry.complexity = data.complexity;
                    break;
                    
                case 'article':
                    entry.tags = data.tags.split(',').map(t => t.trim());
                    break;
            }
            
            return entry;
        },

        // Export content as downloadable files
        exportContent: function() {
            const data = this.getCurrentFormData();
            const errors = this.validateFormData(data);
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n• ' + errors.join('\n• '));
                return;
            }
            
            try {
                // Generate HTML file
                const html = this.generateHTML(data);
                const filename = this.generateFilename(data.title);
                
                // Generate config entry
                const configEntry = this.generateConfigEntry(data);
                
                // Download HTML file
                this.downloadFile(html, filename, 'text/html');
                
                // Show config entry for manual addition
                setTimeout(() => {
                    const configText = JSON.stringify(configEntry, null, 2);
                    alert(`HTML file downloaded!\n\nAdd this entry to contributor-config.json in the "${this.currentTab}s" array:\n\n${configText}`);
                }, 500);
                
            } catch (error) {
                console.error('Export error:', error);
                alert('Error exporting content: ' + error.message);
            }
        },

        // Download file helper
        downloadFile: function(content, filename, mimeType) {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
        },

        // Clear current form
        clearCurrentForm: function() {
            if (confirm('Are you sure you want to clear the form? All data will be lost.')) {
                const form = document.getElementById(`${this.currentTab}-form`);
                form.reset();
                
                const previewArea = document.getElementById('preview-area');
                previewArea.classList.remove('active');
            }
        }
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        Writer.init();
    });

    // Make Writer available globally for debugging
    window.Writer = Writer;

})();