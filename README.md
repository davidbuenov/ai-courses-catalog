# 🤖 AI Courses Catalog

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/davidbuenov/ai-courses-catalog/pulls)

A clean, fast, and fully client-side web application to discover, search, and filter a curated list of courses and resources on Artificial Intelligence. This project runs entirely in the browser without needing a backend or database.

**➡️ Live Demo (Placeholder):** `https://davidbuenov.github.io/ai-courses-catalog/` *(Este enlace funcionará una vez subas el proyecto a un repositorio de GitHub llamado `ai-courses-catalog` y actives GitHub Pages)*

---

## ✨ Features

*   **Instant Search:** Find courses by typing in the search box. It looks through names, descriptions, and categories.
*   **Dynamic Filtering:** Combine search with filters for difficulty level and specific categories.
*   **Client-Side Voting:** Upvote/downvote courses. Your votes are saved locally in your browser's `localStorage`.
*   **Clickable Tags:** Click on any course category tag to instantly filter by that category.
*   **Direct Sharing:** Share interesting courses directly to social media or copy the link.
*   **Zero Backend:** Runs 100% on the client-side, making it incredibly easy to host on services like GitHub Pages.

## 🛠️ Tech Stack

*   **HTML5**
*   **CSS3** (sin frameworks)
*   **JavaScript (Vanilla JS)**
*   **Font Awesome** (for icons)

---

## 🚀 How to Contribute

Contributions are highly welcome! If you know of a great AI course or resource that is not on the list, please add it. The process is simple:

1.  **Fork** the repository.
2.  **Clone** your forked repository to your local machine.
3.  Locate the `data/courses.json` file.
4.  **Add** a new course object to the JSON array. Please ensure it follows the specified format below.
5.  **Commit** your changes and **push** them to your fork.
6.  Create a **Pull Request** back to the main repository, explaining the course(s) you've added.

### Course JSON Format

Each course must be an object with the following structure. Please add it to the list inside `data/courses.json`.

```json
{
  // REQUIRED: The full name of the course or resource.
  "name": "Example Course Name",
  
  // REQUIRED: A direct link to the course. If no link is available, use null.
  "link": "https://example.com/course-link", 
  
  // REQUIRED: The difficulty level. Use one of: "Beginner", "Intermediate", "Advanced", or "Unspecified".
  "difficulty": "Beginner",
  
  // OPTIONAL: A brief, one-sentence description of the course.
  "description": "This is a great course for learning the fundamentals of X.",
  
  // REQUIRED: An array of strings with the relevant categories.
  // Please try to use existing categories from the 'data/categories.json' file if possible.
  "categories": ["AI Agents", "Generative AI"] 
}