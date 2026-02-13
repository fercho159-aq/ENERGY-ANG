import shutil
import os

source_new = r"C:\Users\alexi\.gemini\antigravity\brain\762531e1-6317-4591-888e-8005e2e7307b\media__1770998054890.jpg"
target_original = r"C:\Users\alexi\Downloads\ENERGY-ANG-main\assets\images\hero-main.jpg"
# No need to backup again as we already have one from the first attempt, or we can overwrite the current one which was the previous attempt.

try:
    print(f"Copying from {source_new} to {target_original}")
    shutil.copy2(source_new, target_original)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
