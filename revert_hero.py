import shutil
import os

source_prev = r"C:\Users\alexi\.gemini\antigravity\brain\762531e1-6317-4591-888e-8005e2e7307b\media__1770996880302.jpg"
target = r"C:\Users\alexi\Downloads\ENERGY-ANG-main\assets\images\hero-main.jpg"

try:
    print(f"Reverting {target} to {source_prev}")
    shutil.copy2(source_prev, target)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
