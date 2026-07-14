import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Remove 'required' from input and textarea in the ticket modal
content = content.replace('placeholder="e.g., Tooltip is hard to read in dark mode"\n                                  required', 'placeholder="e.g., Tooltip is hard to read in dark mode"')

content = content.replace('placeholder="Describe the bug or feature idea in detail..."\n                                  rows={4}\n                                  required', 'placeholder="Describe the bug or feature idea in detail..."\n                                  rows={4}')

# Update handleCreateTicket to show toast
find_handler = r'''  const handleCreateTicket = async \(e: React\.FormEvent\) => \{
    e\.preventDefault\(\);
    if \(\!ticketSubject\.trim\(\) \|\| \!ticketFirstMessage\.trim\(\)\) return;'''

repl_handler = r'''  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketFirstMessage.trim()) {
      toast("Please fill out both the subject and message.");
      return;
    }'''

content = re.sub(find_handler, repl_handler, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
