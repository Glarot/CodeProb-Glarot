# Content Validation Rules

This document outlines the technical validation rules for CodeProb content submissions. All content must pass these validation checks before being accepted.

## General Validation Rules

### File Structure
- All content files must be valid HTML5 documents
- Files must include proper DOCTYPE declaration
- Character encoding must be UTF-8
- Viewport meta tag required for mobile compatibility

### Required Elements
- `<title>` element with format: "Content Title - CodeProb"
- Link to main stylesheet: `../assets/css/main.css`
- Standard site header and footer structure
- Main content wrapped in `<article>` element with appropriate class

### Naming Conventions
- **Problems**: `problem-###.html` where ### is a zero-padded number (001, 002, etc.)
- **Concepts**: `kebab-case-name.html` (e.g., `binary-search.html`)
- **Articles**: `article-###.html` where ### is a zero-padded number

## Content-Specific Validation

### Programming Problems

#### Required HTML Structure
```html
<article class="problem" data-id="unique-id" data-difficulty="easy|medium|hard">
  <header>
    <h1>Problem Title</h1>
    <div class="metadata">
      <span class="difficulty">Difficulty Level</span>
      <span class="topics">Related Topics</span>
    </div>
  </header>
  
  <section class="description">
    <!-- Problem statement (required) -->
  </section>
  
  <section class="examples">
    <!-- Input/output examples (required) -->
  </section>
  
  <section class="hints" data-optional="true">
    <!-- Optional hints -->
  </section>
  
  <section class="related-links">
    <!-- Links to concepts and other problems -->
  </section>
</article>
```

#### Validation Rules
- `data-difficulty` must be one of: "easy", "medium", "hard"
- `data-id` must be unique across all problems
- `.description` section is required and must contain problem statement
- `.examples` section is required and must contain at least one example
- `.hints` section is optional but if present must have `data-optional="true"`
- Topics in metadata must be comma-separated

#### Metadata Requirements
```json
{
  "filename": "problem-001.html",
  "title": "Problem Title",
  "difficulty": "easy|medium|hard",
  "topics": ["array", "string", "loop"],
  "author": "Author Name",
  "dateAdded": "YYYY-MM-DD"
}
```

### Concepts & Learning

#### Required HTML Structure
```html
<article class="concept" data-id="unique-id" data-category="category-name">
  <header>
    <h1>Concept Title</h1>
    <div class="metadata">
      <span class="category">Category</span>
      <span class="difficulty">Complexity Level</span>
    </div>
  </header>
  
  <section class="overview">
    <!-- Brief concept introduction (required) -->
  </section>
  
  <section class="explanation">
    <!-- Detailed explanation (required) -->
  </section>
  
  <section class="examples">
    <!-- Code examples and demonstrations -->
  </section>
  
  <section class="related-problems">
    <!-- Links to practice problems -->
  </section>
</article>
```

#### Validation Rules
- `data-category` must be a valid category (see allowed categories below)
- `data-id` must be unique across all concepts
- `.overview` section is required with brief introduction
- `.explanation` section is required with detailed content
- `.examples` section is optional but recommended
- Complexity level must be one of: "beginner", "intermediate", "advanced"

#### Allowed Categories
- fundamentals
- algorithms
- data-structures
- design-patterns
- programming-paradigms
- best-practices
- debugging
- testing
- performance

#### Metadata Requirements
```json
{
  "filename": "recursion.html",
  "title": "Recursion",
  "category": "fundamentals",
  "complexity": "beginner|intermediate|advanced",
  "author": "Author Name",
  "dateAdded": "YYYY-MM-DD"
}
```

### Articles & Insights

#### Required HTML Structure
```html
<article class="article" data-id="unique-id" data-author="author-name">
  <header>
    <h1>Article Title</h1>
    <div class="metadata">
      <span class="author">Author Name</span>
      <span class="date">Publication Date</span>
      <span class="tags">Topic Tags</span>
    </div>
  </header>
  
  <section class="content">
    <!-- Free-form article content (required) -->
  </section>
  
  <section class="references">
    <!-- External links and citations -->
  </section>
</article>
```

#### Validation Rules
- `data-author` must match the author field in metadata
- `data-id` must be unique across all articles
- `.content` section is required and must contain substantial content
- `.references` section is optional but recommended for citations
- Tags must be relevant programming topics

#### Metadata Requirements
```json
{
  "filename": "article-001.html",
  "title": "Article Title",
  "tags": ["tutorial", "javascript", "beginner"],
  "author": "Author Name",
  "dateAdded": "YYYY-MM-DD"
}
```

## Cross-Reference Validation

### Internal Links
- All internal links must point to existing content files
- Link format: `/problems/filename.html`, `/concepts/filename.html`, `/articles/filename.html`
- Broken links will cause validation failure

### Related Content
- Problems can reference concepts and other problems
- Concepts can reference related problems
- Articles can reference any content type
- All references must be valid and reciprocal where appropriate

## Metadata Validation

### Required Fields
All content types must include:
- `filename`: Exact filename of the HTML file
- `title`: Human-readable title matching the H1 element
- `author`: Content creator's name
- `dateAdded`: ISO date format (YYYY-MM-DD)

### Optional Fields
- `description`: Brief summary for listings (auto-generated if missing)
- `lastModified`: Date of last significant update
- `version`: Content version number

### Validation Rules
- Dates must be in ISO format (YYYY-MM-DD)
- Author names must be consistent across contributions
- Titles must match the H1 element in the HTML file
- Filenames must match the actual file being submitted

## HTML Validation

### Semantic Structure
- Use appropriate heading hierarchy (H1 → H2 → H3)
- Use semantic elements (`<section>`, `<article>`, `<header>`)
- Include proper ARIA labels where needed
- Ensure logical tab order for keyboard navigation

### Code Examples
- Use `<pre><code>` for code blocks
- Include language specification where possible
- Ensure proper escaping of HTML entities
- Use syntax highlighting classes consistently

### Accessibility
- All images must have alt text
- Proper heading structure for screen readers
- Sufficient color contrast ratios
- Keyboard navigation support

## Performance Requirements

### File Size Limits
- HTML files should not exceed 500KB
- Embedded images should be optimized
- Minimize inline styles and scripts
- Use external resources efficiently

### Loading Performance
- Critical CSS should be inlined if necessary
- Non-critical resources should be loaded asynchronously
- Avoid blocking JavaScript in the head
- Optimize for mobile devices

## Automated Validation

### Pre-submission Checks
The Writer Interface performs these validations:
- HTML structure validation
- Required section presence
- Metadata completeness
- Naming convention compliance
- Internal link validation

### Post-submission Checks
GitHub Actions will validate:
- HTML5 compliance
- Accessibility standards
- Performance metrics
- Cross-reference integrity
- Duplicate content detection

## Common Validation Errors

### Structure Errors
- Missing required sections
- Incorrect article class or data attributes
- Malformed HTML elements
- Missing or incorrect metadata

### Content Errors
- Empty required sections
- Broken internal links
- Inconsistent difficulty/complexity ratings
- Missing or incorrect author attribution

### Format Errors
- Incorrect filename format
- Invalid date formats in metadata
- Mismatched titles between HTML and metadata
- Inconsistent category or tag usage

## Validation Tools

### Online Validators
- [W3C HTML Validator](https://validator.w3.org/)
- [WAVE Accessibility Checker](https://wave.webaim.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Local Testing
- Use the Writer Interface preview feature
- Test in multiple browsers
- Validate with browser developer tools
- Check mobile responsiveness

## Error Resolution

### Common Fixes
1. **Missing sections**: Add required HTML sections with appropriate content
2. **Invalid metadata**: Correct format and required fields in contributor-config.json
3. **Broken links**: Verify all internal links point to existing files
4. **HTML errors**: Use validator tools to identify and fix markup issues

### Getting Help
- Check existing content for examples
- Review this validation guide thoroughly
- Ask questions in GitHub issues
- Request clarification in pull request comments

## Updates to Validation Rules

### Change Process
- Validation rules may be updated to improve quality
- Changes will be announced in the repository
- Existing content will be grandfathered unless critical issues exist
- Contributors will be notified of significant changes

### Backward Compatibility
- Existing valid content will remain valid
- New rules apply only to new submissions
- Migration guides provided for breaking changes
- Reasonable transition periods for major updates