# 🤖 Multi-Catalog Project: AI & Unreal Engine

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/davidbuenov/ai-courses-catalog/pulls)

Welcome! This repository is the central source code for a multi-themed catalog application. Using a single, clean codebase, this project builds and maintains two separate, fully-featured websites: an **AI Content Catalog** and an **Unreal Engine Content Catalog**.

This project uses a "monorepo" approach, meaning the core application logic (HTML, CSS, JS) is shared, while the content for each catalog (data, categories, types) is kept separate. This ensures that any improvements or bug fixes to the application benefit both websites simultaneously.

## 🌐 Live Catalogs

You can visit the live, deployed websites here:

*   **➡️ AI Content Catalog (Live):** [`https://davidbuenov.github.io/ai-courses-catalog/dist_ai/`](https://davidbuenov.github.io/ai-courses-catalog/dist_ai/)
*   **➡️ Unreal Engine Catalog (Live):** [`https://davidbuenov.github.io/ai-courses-catalog/dist_unreal/`](https://davidbuenov.github.io/ai-courses-catalog/dist_unreal/) 

## 🏛️ Project Architecture

The project is structured to separate the application "engine" from the data it displays:

```
/
├── app/ # The shared application (HTML template, CSS, JS)
├── data/
│ ├── ai/ # Data specific to the AI catalog
│ │ ├── courses.json
│ │ ├── categories.json
│ │ └── types.json
│ └── unreal/ # Data specific to the Unreal Engine catalog
│ ├── courses.json
│ ├── categories.json
│ └── types.json
│
├── dist_ai/ # Output folder for the AI site (ready to deploy)
├── dist_unreal/ # Output folder for the Unreal site (ready to deploy)
│
├── build.py # Python script to build the final websites
├── index.html # Global index of the portal
├── portal-style.css # styles only for the portal
├── images/  #images only for the portal
└── README.md
```
## Generated code
*   **`/app`**: Contains the core, reusable front-end code.
*   **`/data`**: Holds the unique content for each catalog theme.
*   **`build.py`**: A powerful script that combines the `app` engine with a specific `data` set to generate a complete website.
*   **`/dist_*`**: These folders are generated by the build script. **They contain the final websites ready for deployment.**
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

## 🚀 How to Contribute

We welcome two types of contributions: adding new content and improving the application itself.

### 1. Adding New Content (The Easy Way)

If you know of a great course, book, tool, or resource, this is the way to go. You don't need to run any scripts.

1.  **Fork** this repository.
2.  Navigate to the appropriate data folder (`data/ai/` or `data/unreal/`).
3.  Edit the corresponding `courses.json`, `categories.json`, or `types.json` file directly on GitHub or in your cloned repo.
4.  Please ensure any new entry in `courses.json` follows the format below.
5.  Create a **Pull Request** with your changes.

#### Content JSON Format

```json
{
  "name": "Example Content Name",
  "link": "https://example.com/content-link",
  "difficulty": "Beginner", // Beginner, Intermediate, Advanced, or Unspecified
  "type": "Course",        // Course, Book, Newsletter, or Tool
  "description": "A brief description of the content.",
  "categories": ["Category A", "Category B"]
}
```
### 2. Improving the Application (For Developers)

If you want to fix a bug or add a new feature to the website itself:

1.  **Fork** and **clone** the repository.
2.  Make your changes to the files inside the `/app` directory (e.g., `app/js/script.js` or `app/css/style.css`).
3.  **Run the build script** to apply your changes. To build both sites, run:
    ```bash
    python build.py
    ```
4.  **Test your changes locally** by running a web server inside one of the output folders (e.g., `dist_ai`).
5.  Commit your changes and create a **Pull Request**.

## ✍️ Authors

This project was brought to life by:

*   **David Bueno Vallejo**
    *   **LinkedIn:** [`linkedin.com/in/davidbueno`](https://www.linkedin.com/in/davidbueno/)
    *   **Website:** [`davidbuenov.com`](https://davidbuenov.com)

*   **Google AI Studio**
    *   The structure, code, and functionalities of this web application were generated with the assistance of Google's AI models.
    *   **Learn more:** [`aistudio.google.com`](https://aistudio.google.com/)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).