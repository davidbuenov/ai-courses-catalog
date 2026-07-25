## Multi-Catalog Update — July 2026

**AI Catalog:** 249 → 277 entries (**+28**)
**Unreal Engine Catalog:** 302 → 306 entries (**+4**)
**Total catalog size:** 551 → 583 entries (**+32**)

Unreal Engine stable version referenced: **UE 5.8** (released at State of Unreal, June 17, 2026).

---

### AI Catalog — New Entries (28)

#### Courses (7)

| Name | Description |
| :-- | :-- |
| [The Science and Implications of Generative AI (Harvard Kennedy School)](https://generative-ai-course.hks.harvard.edu/spring-2024) | Harvard Kennedy School course on generative AI covering how LLMs work, prompt engineering, retrieval-augmented generation and fine-tuning, plus societal implications like misinformation, copyright and the future of work, with full video sessions. |
| [CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/) | Harvard's free OpenCourseWare exploring the concepts and algorithms behind modern AI, including search, knowledge representation, optimization, machine learning, and neural networks, through hands-on Python projects. |
| [Spec-Driven Development with the Antigravity CLI (Google Codelabs)](https://codelabs.developers.google.com/sdd-agy-cli) | Google Codelabs hands-on tutorial teaching spec-driven development with the Antigravity CLI, where an agent adds a BigQuery integration to an e-commerce dashboard using skills, MCP, and Google Cloud plugins. |
| [Stanford CS229: Building Large Language Models](https://www.youtube.com/watch?v=9vM4p9NN0Ts) | Stanford CS229 guest lecture covering how to build a ChatGPT-like model, from pretraining (tokenization, evaluation, benchmarks) through post-training (SFT and RLHF). |
| [Vibe Coding XR: Accelerating AI + XR Prototyping with XR Blocks and Gemini](https://www.youtube.com/watch?v=nknCzIxHHzw) | Session showing rapid XR prototyping by combining Google's XR Blocks framework with Gemini, demonstrating how AI-assisted development speeds up building extended-reality experiences. |
| [AI Agents for Beginners](https://www.youtube.com/playlist?list=PLlrxD0HtieHgKcRjd5-8DT9TbwdlDO-OC) | 10-lesson course taking learners from concept to code while covering the fundamentals of building AI agents, with full course materials and code samples. |
| [Fast LLM Inference with Cerebras](https://www.deeplearning.ai/courses/fast-llm-inference-with-cerebras) | DeepLearning.AI short course built with Cerebras teaching how to build real-time LLM applications on Cerebras' Wafer-Scale Engine (WSE-3), covering inference-speed fundamentals and hands-on labs on live personalization and multi-tool workflows. |

#### Tools (21)

| Name | Description |
| :-- | :-- |
| [herdr](https://github.com/ogulcancelik/herdr) | Terminal-based multiplexer for running and monitoring multiple coding agents (Claude Code, Codex, and 30+ others) in real terminal panes, with live status tracking, mouse-native workspaces, and persistent remote/SSH sessions. |
| [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) | Open-weight text-to-speech model with 82 million parameters that delivers quality comparable to larger models while being faster and cheaper to run, released under an Apache license. |
| [SkillSpector](https://github.com/nvidia/skillspector) | Security scanner for AI agent skills (Claude Code, Codex CLI, Gemini CLI) that detects vulnerabilities and malicious patterns through static analysis, AST inspection, and optional LLM semantic review. |
| [caveman](https://github.com/juliusbrussee/caveman) | Skill/plugin for Claude Code and 30+ other coding agents that compresses responses into terse, technically accurate language, cutting output tokens by roughly 65% on benchmarked tasks. |
| [Claude Context (Zilliz)](https://github.com/zilliztech/claude-context) | MCP-based semantic code search tool that indexes an entire codebase so coding agents like Claude Code can use it as context without reading every file. |
| [Token Savior](https://github.com/mibayy/token-savior) | MCP server combining structural code navigation with persistent memory for coding agents, benchmarked at an 80% reduction in active tokens and a 97.9% success rate on a 96-task coding benchmark. |
| [Pocket TTS](https://github.com/kyutai-labs/pocket-tts) | Lightweight open-source text-to-speech model (100M parameters) by Kyutai that runs efficiently on CPU with low latency, voice cloning, and support for six languages. |
| [OpenScience](https://github.com/synthetic-sciences/openscience) | Open-source, model-agnostic AI workbench that runs an autonomous research loop — literature review, hypothesis, code, experiments, write-up — for machine learning, biology, physics, and chemistry. |
| [OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) | Free, open-source, single-binary office suite built for AI agents to read, edit, and automate Word, Excel, and PowerPoint files without requiring Office to be installed. |
| [Presidio](https://github.com/data-privacy-stack/presidio) | Open-source, context-aware framework using NLP and pattern matching to detect, redact, mask, and anonymize personally identifiable information across text, images, and structured data. |
| [NameThatUI](https://namethatui.com/) | Visual dictionary of UI elements: describe a component in plain words and get its real name, API symbol, and a precise prompt ready to paste into a coding agent. |
| [last30days-skill](https://github.com/mvanhorn/last30days-skill) | AI agent skill that researches any topic across Reddit, X, YouTube, Hacker News, Polymarket, and the web, then synthesizes a grounded summary of recent activity. |
| [Aiden](https://github.com/taracodlabs/aiden) | Autonomous AI agent that operates a computer from prompts, with browser control, terminal execution, workflow tools, error-recovery systems, and persistent memory. |
| [LiteRT.js](https://github.com/google-ai-edge/LiteRT/tree/main/litert/js) | Web runtime for Google's LiteRT (formerly TensorFlow Lite) that runs .tflite on-device AI models directly in the browser with WebGPU or WASM acceleration, for tasks like image segmentation and pose estimation. |
| [Thiings](https://www.thiings.co/things) | Growing library of over 10,000 free 3D icons generated with AI, downloadable individually or under a commercial license for the full collection. |
| [video-use](https://github.com/browser-use/video-use) | Open-source Claude Code skill that edits raw video into a finished cut — trimming filler words, color grading, adding subtitles — by having the LLM read transcripts and timelines instead of watching every frame. |
| [Grok Build (grok CLI)](https://github.com/xai-org/grok-build) | xAI's terminal-based AI coding agent: a full-screen TUI that understands a codebase, edits files, runs shell commands, searches the web, and manages long tasks interactively or headlessly. |
| [Open Code Review (OCR)](https://github.com/alibaba/open-code-review) | Open-source AI code review CLI used at Alibaba's scale, combining deterministic pipelines with an LLM agent to produce line-level review comments (null pointers, thread-safety, XSS, SQL injection). |
| [Penecho](https://github.com/penecho/penecho) | A shared canvas for thinking with AI beyond the chat box, supporting handwriting, equations, diagrams, and spatial reasoning. |
| [NVIDIA-labs OO Agents (NOOA)](https://github.com/NVIDIA-NeMo/labs-OO-Agents) | Model-agnostic Python framework for building AI agents where state, capabilities, prompts, and typed interfaces are expressed as a single class, with async LLM-driven methods, tracing, and memory. |
| [ADK Agent Template](https://github.com/zackseal89/Agentic-IDE-ADK-python-Starter-Template) | Starter template for building AI agents with Google's Agent Development Kit (ADK) in Python, designed for use with AI coding assistants, including basic, tool-using, and memory-enabled agent templates. |

---

### Unreal Engine Catalog — New Entries (4)

#### Videos (4)

| Name | Description |
| :-- | :-- |
| [This Is How 3D Artists Will Work in 2027 — Pro AI Character Workflow](https://www.youtube.com/watch?v=0TGkhdMI3tc) | Shows an AI-assisted 3D character production pipeline in Unreal Engine 5.8 — from 2D concept to base-mesh generation to a rigged, playable MetaHuman — illustrating how AI tools compress traditional character-art workflows. |
| [Unreal Engine 5.8 Beginner Tutorial - Getting Started (2026)](https://www.youtube.com/watch?v=57yLCKqC9m8) | Beginner walkthrough for getting started in Unreal Engine 5.8, covering installation and first steps in the updated editor. |
| [Unreal Engine 5.8 Is Out! - How To Make Your First Game (Full Course)](https://www.youtube.com/watch?v=DooFXuCDOaE) | Full beginner course for building a first game in Unreal Engine 5.8, covering the updated editor and core gameplay setup. |
| [Unreal Engine 5.8 for Architects - 2026 Full Course](https://www.youtube.com/watch?v=CnoC-v9xB_E) | Full course applying Unreal Engine 5.8 to architectural visualization workflows, covering lighting and rendering setups for archviz projects. |
