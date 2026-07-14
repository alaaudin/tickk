with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = """        if (soundEnabled) playSuccessChime();
        toast("Feedback submitted successfully");
        fetchTickets(); // Refresh tickets list to ensure it's at the top"""

repl_str = """        if (soundEnabled) playSuccessChime();
        toast("Feedback submitted successfully");
        setSelectedTicket(data.ticket);
        fetchTickets(); // Refresh tickets list to ensure it's at the top"""

if find_str in content:
    content = content.replace(find_str, repl_str)
    with open("src/components/Dashboard.tsx", "w") as f:
        f.write(content)
    print("Fixed submit action.")
else:
    print("String not found!")
