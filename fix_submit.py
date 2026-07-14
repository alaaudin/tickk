import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = r'''        // Update user credits in state
        if (data.newCredits !== undefined) {
          setUserCredits(data.newCredits);
        }
        
        if (soundEnabled) playSuccessChime();'''

repl_str = r'''        // Update user credits in state
        if (data.newCredits !== undefined) {
          setUserCredits(data.newCredits);
        }
        
        if (soundEnabled) playSuccessChime();
        toast("Feedback submitted successfully");
        fetchTickets(); // Refresh tickets list to ensure it's at the top'''

content = content.replace(find_str, repl_str)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
