import shutil
import os

source_new = r"C:\Users\alexi\.gemini\antigravity\brain\762531e1-6317-4591-888e-8005e2e7307b\media__1770997531655.jpg"
target_original = r"C:\Users\alexi\Downloads\ENERGY-ANG-main\assets\images\express-delivery.jpg"
target_backup = r"C:\Users\alexi\Downloads\ENERGY-ANG-main\assets\images\express-delivery_backup.jpg"

try:
    # Backup
    if os.path.exists(target_original):
        print(f"Backing up {target_original} to {target_backup}")
        shutil.copy2(target_original, target_backup)
    
    # Replace
    print(f"Copying from {source_new} to {target_original}")
    shutil.copy2(source_new, target_original)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
