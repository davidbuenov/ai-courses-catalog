# 🤖 AI Content Catalog

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/davidbuenov/ai-courses-catalog/pulls)

A clean, fast, and fully client-side web application to discover, search, and filter a curated list of AI content, including courses, books, tools, and newsletters. This project runs entirely in the browser without needing a backend or database.

**➡️ Live Demo (Placeholder): [https://davidbuenov.github.io/ai-courses-catalog/](https://davidbuenov.github.io/ai-courses-catalog/)

---

## ✨ Features

*   **Instant Search:** Find content by typing in the search box (activates with 3+ characters). It looks through names, descriptions, and categories.
*   **Dynamic Filtering:** Combine search with filters for **Content Type**, **Difficulty Level**, and specific **Categories**.
*   **Dynamic Header Counters:** The header provides an at-a-glance summary of how many items of each content type are available.
*   **Interactive Filter Tags:** Active filters appear as removable pills for a clear overview of the current query.
*   **Clickable Tags:** Click on any content category tag to instantly filter by that category.
*   **Direct Sharing:** Share interesting content directly to social media or copy the link.
*   **Client-Side Voting:** Upvote/downvote content. Your votes are saved locally in your browser's `localStorage`.
*   **Zero Backend:** Runs 100% on the client-side, making it incredibly easy to host on services like GitHub Pages.

## 🛠️ Tech Stack

*   **HTML5**
*   **CSS3** (without frameworks)
*   **JavaScript (Vanilla JS)**
*   **Font Awesome** (for icons)

---

## 🚀 How to Contribute

Contributions are highly welcome! If you know of a great AI course, book, tool, or newsletter that isn't on the list, please add it. The process is simple:

1.  **Fork** the repository.
2.  **Clone** your forked repository to your local machine.
3.  Locate the `data/courses.json` file.
4.  **Add** a new content object to the JSON array. Please ensure it follows the specified format below.
5.  **Commit** your changes and **push** them to your fork.
6.  Create a **Pull Request** back to the main repository, explaining the content you've added.

### Content JSON Format

Each entry must be a JSON object with the following structure. Please add it to the list inside `data/courses.json`.

```json
{
  // REQUIRED: The full name of the content or resource.
  "name": "Example Content Name",
  
  // REQUIRED: A direct link to the content. If no link is available, use null.
  "link": "https://example.com/content-link", 
  
  // REQUIRED: The difficulty level. Use one of: "Beginner", "Intermediate", "Advanced", or "Unspecified".
  "difficulty": "Beginner",

  // REQUIRED: The type of the content. 
  // Must be one of: "Course", "Book", "Newsletter", or "Tool".
  "type": "Course",
  
  // OPTIONAL: A brief, one-sentence description of the content.
  "description": "This is a great resource for learning the fundamentals of X.",
  
  // REQUIRED: An array of strings with the relevant categories.
  // Please try to use existing categories from the 'data/categories.json' file if possible.
  "categories": ["AI Agents", "Generative AI"] 
}