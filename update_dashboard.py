import re

with open('src/components/Dashboard.tsx', 'r') as f:
    code = f.read()

# 1. Update the icon logic
code = re.sub(
    r"previewTracker\.recipient\.includes\('gmail'\) \? <GmailIcon \/> : <OutlookIcon \/>",
    r"previewTracker.recipient.includes('outlook') || previewTracker.recipient.includes('hotmail') ? <OutlookIcon /> : <GmailIcon />",
    code
)

# 2. Update the main preview condition.
# Currently it is: `{previewTracker.recipient.includes('gmail') ? (`
# Followed by Gmail block, then `) : (` then Outlook block, then `)}`
# I will swap the blocks and change the condition!

# Let's just find the Gmail block and Outlook block
gmail_block_regex = r"(\{\s*\/\*\s*Gmail Header\s*\*\/[\s\S]*?)(?=\s*\) : \(\s*<div className=\"w-full max-w-4xl bg-white dark:bg-\[#111111\])"
outlook_block_regex = r"(\{\s*\/\*\s*Outlook Header\s*\*\/[\s\S]*?)(?=\s*\)\s*\}\s*<\/div>\s*\)\s*:\s*\()"

# Actually it's easier to manually replace the whole visual preview block.
