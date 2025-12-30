# Contributing to CodeProb

Welcome to CodeProb! This guide will help you contribute programming problems, concepts, and articles to our community-driven platform.

## Overview

CodeProb is a fully static platform hosted on GitHub Pages. All contributions are made through GitHub pull requests, ensuring quality control and version history. The platform automatically discovers and indexes your content using a simple configuration system.

## Content Types

### Programming Problems
- **Purpose**: Focused coding exercises similar to CodingBat
- **Structure**: Problem description, examples, optional hints
- **Filename**: `problem-###.html` (e.g., `problem-001.html`)

### Concepts & Learning
- **Purpose**: Educational content explaining programming concepts
- **Structure**: Overview, detailed explanation, code examples
- **Filename**: `concept-name.html` (e.g., `recursion.html`)

### Articles & Insights
- **Purpose**: Free-form educational or opinion-based writing
- **Structure**: Flexible content with metadata
- **Filename**: `article-###.html` (e.g., `article-001.html`)

## Contribution Workflow

### Step 1: Create Content
1. Visit the [Writer Interface](/writer.html)
2. Choose your content type (Problem, Concept, or Article)
3. Fill in the required fields and content
4. Preview your content to ensure it looks correct
5. Export the HTML file and configuration entry

### Step 2: Prepare Your Submission
1. Fork the [CodeProb repository](https://github.com/codeprob/codeprob)
2. Add your HTML file to the appropriate directory:
   - Problems: `/problems/your-file.html`
   - Concepts: `/concepts/your-file.html`
   - Articles: `/articles/your-file.html`
3. Update `contributor-config.json` with your content entry

### Step 3: Submit Pull Request
1. Create a pull request with your changes
2. Use a descriptive title: "Add [content-type]: [title]"
3. Include a brief description of your contribution
4. Wait for review and feedback from maintainers

## Content Guidelines

### General Requirements
- All content must be original or properly attributed
- Use clear, concise language appropriate for the target audience
- Follow the established HTML structure for your content type
- Include proper metadata (title, author, date, etc.)

### Programming Problems
- **Difficulty Levels**: easy, medium, hard
- **Required Sections**: description, examples
- **Optional Sections**: hints, related links
- **Topics**: Tag with relevant programming concepts
- **Examples**: Provide clear input/output examples

### Concepts & Learning
- **Categories**: fundamentals, algorithms, data-structures, design-patterns, etc.
- **Complexity Levels**: beginner, intermediate, advanced
- **Required Sections**: overview, explanation
- **Optional Sections**: examples, related problems
- **Writing Style**: Educational, neutral tone similar to Wikipedia

### Articles & Insights
- **Tags**: Use relevant topic tags for discoverability
- **Length**: No strict limits, but aim for substantial content
- **Style**: Can be tutorial, opinion, or analysis
- **Attribution**: Cite sources and provide references

## Technical Requirements

### HTML Structure
Each content file must follow this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Title - CodeProb</title>
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
    <!-- Standard header navigation -->
    <header class="site-header">...</header>
    
    <main class="main-content">
        <div class="container">
            <article class="[problem|concept|article]" data-id="unique-id">
                <!-- Your content here -->
            </article>
        </div>
    </main>
    
    <!-- Standard footer -->
    <footer class="site-footer">...</footer>
</body>
</html>
```

### Metadata Requirements
Update `contributor-config.json` with your content information:

```json
{
  "filename": "your-file.html",
  "title": "Your Content Title",
  "author": "Your Name",
  "dateAdded": "YYYY-MM-DD",
  // Additional fields based on content type
}
```

### Naming Conventions
- **Files**: Use lowercase, hyphens for spaces
- **IDs**: Unique identifier for each piece of content
- **Classes**: Follow existing CSS class patterns

## Quality Standards

### Content Quality
- Accurate and well-researched information
- Clear explanations with appropriate examples
- Proper grammar and spelling
- Appropriate difficulty level for target audience

### Code Quality
- Valid HTML5 markup
- Semantic structure using appropriate elements
- Accessibility considerations (alt text, proper headings)
- Consistent formatting and indentation

### Testing Your Content
Before submitting:
1. Validate HTML using online validators
2. Test in multiple browsers
3. Check that all links work correctly
4. Ensure content displays properly on mobile devices
5. Verify that your content appears in the index after adding to config

## Review Process

### What Reviewers Check
- Content accuracy and quality
- Proper HTML structure and validation
- Adherence to naming conventions
- Appropriate metadata and categorization
- No duplicate or conflicting content

### Common Issues
- Missing required sections in HTML structure
- Incorrect filename or metadata format
- Broken internal links or references
- Content that doesn't match the specified difficulty/complexity
- Insufficient examples or explanations

### Feedback and Revisions
- Reviewers will provide specific feedback on needed changes
- Make requested revisions and update your pull request
- Engage constructively with reviewer comments
- Ask questions if feedback is unclear

## Best Practices

### Writing Tips
- Start with a clear introduction or problem statement
- Use progressive disclosure (simple to complex)
- Include practical examples and use cases
- Link to related content when appropriate
- Consider your audience's experience level

### Technical Tips
- Use the Writer Interface to ensure proper formatting
- Test your content locally before submitting
- Keep file sizes reasonable (optimize images if used)
- Follow existing patterns in similar content
- Use semantic HTML elements appropriately

## Getting Help

### Resources
- [Writer Interface](/writer.html) - Create content with proper formatting
- [Validation Rules](validation-rules.md) - Detailed technical requirements
- [GitHub Issues](https://github.com/codeprob/codeprob/issues) - Report problems or ask questions

### Community
- Join discussions in pull request comments
- Help review other contributors' submissions
- Suggest improvements to the platform itself
- Share feedback on the contribution process

## Recognition

Contributors are recognized through:
- Author attribution on all content
- Contributor list in the repository
- GitHub contribution history
- Community acknowledgment for quality contributions

Thank you for contributing to CodeProb! Your knowledge and expertise help make programming education more accessible to everyone.