# Discord AI Automation Bridge

A Python-based Discord bot that integrates a local Large Language Model (LLM) directly into chat channels. This project demonstrates API integration, error handling, asynchronous message processing, and secure token management using the **Discord.py** framework.

## 🚀 Live Demo

**Test the bot without installing anything.**

Please ping the owner of discord server @logicluminary
Join the public server below to see the AI in action:

[Join Server](https://discord.gg/EbtTS78twa)

*(If the button doesn't work, click [here](https://discord.gg/EbtTS78twa))*

## ✨ Features

- **Local LLM Integration:** Connects directly to a local AI model (Qwen/Qwen3.5-9b) via LM Studio API.
- **Command Trigger:** Users can ask questions using the `!.ask [Your Question]` command.
- **Error Handling:** Includes robust checks for API connection errors, empty prompts, and invalid responses.
- **Secure Token Management:** Uses environment variables (`.env`) to store sensitive tokens securely.
- **Non-Blocking Async Processing:** Optimized with `asyncio.to_thread()` to prevent bot disconnections during AI requests.

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Language** | Python 3.x |
| **Framework** | Discord.py |
| **API** | LM Studio (Local LLM) |
| **Libraries** | `requests`, `python-dotenv`, `asyncio` |

## How to Run This Locally

To run this project on your own machine, you will need a local LLM server running.

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Setup Environment

Create a file named `.env` in the root folder and add your bot token:

```bash
DISCORD_TOKEN=your_bot_token_here
```

### Step 3: Run LM Studio

Ensure your local LM Studio server is running on `localhost:1234`:

```bash
lmstudio-server --port 1234
```

### Step 4: Run the Bot

```bash
python main.py
```

## 📂 Project Structure

| File | Description |
| :--- | :--- |
| `main.py` | Bot entry point and core logic |
| `requirements.txt` | Python dependencies |
| `.env` | Bot token — do not share or commit this file |
| `README.md` | This documentation |
