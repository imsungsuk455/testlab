import os
import subprocess
from dotenv import load_dotenv

load_dotenv()

key = os.environ.get("GEMINI_API_KEY")

if key:
    print("Setting github secret GEMINI_API_KEY...")
    process = subprocess.Popen(["gh", "secret", "set", "GEMINI_API_KEY"], stdin=subprocess.PIPE, text=True)
    process.communicate(input=key)
    print("Return code:", process.returncode)
else:
    print("GEMINI_API_KEY not found in .env")
