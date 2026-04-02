import os
import requests
import discord
from dotenv import load_dotenv
import asyncio  # For running tasks in background threads
import logging  # For better error logs

# --- SETUP LOGGING ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- CONFIGURATION ---
load_dotenv()
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

# 1. LM Studio model name (Use your actual model from LM Studio)
MODEL_NAME = "qwen/qwen3.5-9b"

# 2. API Configuration (Change to your remote server if needed)
API_URL = "http://127.0.0.1:1234/v1/chat/completions"

# --- END CONFIGURATION ---


class LocalAIBot(discord.Client):
    def __init__(self):
        # Enable intents so the bot can read message content
        intents = discord.Intents.default()
        intents.message_content = True
        super().__init__(intents=intents)

    async def on_ready(self):
        print(f'✅ Logged in as {self.user}!')
        print(f"👋 Waiting for user messages...")

    async def on_message(self, message):
        # Ignore if the bot replies to itself
        if message.author == self.user:
            return

        # 1. Check if the user types the command trigger
        if message.content.startswith("!.ask"):
            prompt = message.content.replace("!.ask", "").strip()

            # Safety check: do not process if empty
            if not prompt:
                try:
                    await message.channel.send("❌ Usage: !.ask [Your question]")
                except:
                    pass
                return

            print(f"--- New Request from Discord ---\n{prompt}")

            # 2. Send request to LM Studio API (FIXED: Non-blocking!)
            payload = {
                "model": MODEL_NAME,
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant. Respond concisely and naturally."},
                    {"role": "user", "content": prompt}
                ],
                "stream": False
            }

            try:
                # ✅ FIXED: Run in background thread so bot doesn't crash
                response = await asyncio.to_thread(requests.post, API_URL, json=payload)

                # 3. Check if LM Studio responded OK (status 200)
                response.raise_for_status()
                result = response.json()

                ai_response = result['choices'][0]['message']['content']

                # 4. Send response back to Discord
                await message.channel.send(ai_response, allowed_mentions=discord.AllowedMentions(everyone=False))

            except requests.exceptions.ConnectionError:
                logger.error("❌ LM Studio server is not running or accessible.")
                await message.channel.send("⚠️ Error: LM Studio server is not running. Make sure it's started!")
            except KeyError as e:
                logger.error(f"API Error: {e}")
                await message.channel.send("⚠️ Error: Could not process request. Check if the model name matches in LM Studio.")
            except requests.exceptions.HTTPError as e:
                logger.error(f"Server Error: {e.response.status_code} ({e.reason})")
                await message.channel.send(f"⚠️ Server Error: {e.response.status_code}")

# --- RUNS THE BOT ---
if __name__ == "__main__":
    bot = LocalAIBot()
    bot.run(DISCORD_TOKEN, reconnect=True)
