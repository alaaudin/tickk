import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = r'''      if (res.ok) {
        const data = await res.json();
        setTickets(prev => [data.ticket, ...prev]);
        setIsNewTicketModalOpen(false);
        setTicketSubject("");
        setTicketFirstMessage("");
        setTicketCategory("bug");
        
        // Update user credits in state
        if (data.newCredits !== undefined) {
          setUserCredits(data.newCredits);
        }
        
        if (soundEnabled) playSuccessChime();
        toast("Feedback submitted successfully");
        setSelectedTicket(data.ticket);
        fetchTickets(); // Refresh tickets list to ensure it's at the top
      }'''

repl_str = r'''      if (res.ok) {
        const data = await res.json();
        setTickets(prev => [data.ticket, ...prev]);
        setIsNewTicketModalOpen(false);
        setTicketSubject("");
        setTicketFirstMessage("");
        setTicketCategory("bug");
        
        // Update user credits in state
        if (data.newCredits !== undefined) {
          setUserCredits(data.newCredits);
        }
        
        if (soundEnabled) playSuccessChime();
        toast("Feedback submitted successfully");
        setSelectedTicket(data.ticket);
        fetchTickets(); // Refresh tickets list to ensure it's at the top
      } else {
        const errData = await res.text();
        console.error("Error submitting ticket:", errData);
        toast(`Failed to submit feedback: ${res.status} ${errData}`);
      }'''

content = content.replace(find_str, repl_str)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
