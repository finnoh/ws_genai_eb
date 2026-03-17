# AI Agents in Economics and Business Research

<figure>
  <img src="https://businessdatascience.nl/media/content/image/mcith/genai_spring_school_ad2.jpg" width="300">
  <figcaption>[Public workshop repository for the Tinbergen Institute 2-day course on AI agents in economics and business research.](https://businessdatascience.nl/ai-agents-in-economics-and-business-research)</figcaption>
</figure>

## Student Quick Start

If you're a student looking for the exercise workspace:

**Option 1: One-line Install (Recommended)**
```bash
curl -sL https://raw.githubusercontent.com/finnoh/ti-student-agent-pack/main/install.sh | bash
```

This will clone the repository to `student-agent-pack/` and set up your environment.

**Option 2: Download and Install**
1. Download the latest release from [github.com/finnoh/ti-student-agent-pack](https://github.com/finnoh/ti-student-agent-pack/releases)
2. Extract the zip file to a new folder
3. Run:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

**Option 3: Use this repository**
```bash
./scripts/course_pack/package_student_agent_pack.sh
unzip outputs/course-pack/ti-student-agent-pack-latest.zip
chmod +x install.sh
./install.sh
```

## What is in this repository

- `AGENTS.md`: single source of truth for course outline, schedule, and teaching operations.
- `slides/`: Quarto revealjs slide decks for Day 1 and Day 2.
- `website/`: Docusaurus companion website for participants.
- `resources/`: curated links, paper registry, and open-access PDFs.
- `scripts/`: helper scripts for slide rendering and Google Forms/Sheets workflow.
- `student-agent-pack/`: portable student workspace (also available as a [separate repository](https://github.com/finnoh/ti-student-agent-pack)).

## Course structure

- Day 1: foundations (LLMs, prompting, coding agents, safety basics)
- Day 2: advanced systems (MCP, memory, LangChain/OpenClaw, research workflows)
- Design target: roughly 50% hands-on exercises.

## Quick start

### 1) Companion website

```bash
cd website
npm install
npm run start
```

### 2) Render slides

```bash
./scripts/render_slides.sh
```

Slides are rendered into `website/static/slides/` so they can be linked from the companion site.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-website.yml`.

On pushes to `main`, it:

1. renders Quarto slides,
2. builds the Docusaurus site,
3. deploys to GitHub Pages.

## Submission workflow

We use Google Forms + Google Sheets for reliability in live teaching. The full operational details are in `AGENTS.md` under "Exercise Submission Workflow".

Recommended ingestion path is Form-first (not direct Sheet writes):

- Students submit through prefilled Google Form links.
- Form responses flow into the linked Google Sheet.
- This avoids per-student API auth and protects sheet structure during class.

## Student agent pack

This repo includes a portable student workspace in `student-agent-pack/`.

- Students can open that directory directly in their coding agent.
- Submissions are helper-driven via browser-confirmed Google Form prefill.
- Removal is simple: close the workspace and delete the directory.

**Separate GitHub repository:** The student agent pack is also available as a standalone repository at [github.com/finnoh/ti-student-agent-pack](https://github.com/finnoh/ti-student-agent-pack).

To package it for distribution:

```bash
./scripts/course_pack/package_student_agent_pack.sh
```

The packagen script creates a zip file with:
- Root-level `install.sh` for easy one-line installation
- `student-agent-pack/` directory with all exercise files and tools
