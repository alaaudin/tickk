import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

pattern = """      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setTickets(prev => [data.ticket, ...prev]);
        }
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
      }"""

replacement = """      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setTickets(prev => [data.ticket, ...prev]);
          
          // Update user credits in state
          if (data.newCredits !== undefined) {
            setUserCredits(data.newCredits);
          }
          setSelectedTicket(data.ticket);
        }
        setIsNewTicketModalOpen(false);
        setTicketSubject("");
        setTicketFirstMessage("");
        setTicketCategory("bug");
        
        if (soundEnabled) playSuccessChime();
        toast("Feedback submitted successfully");
        
        fetchTickets(); // Refresh tickets list to ensure it's at the top
      }"""

content = content.replace(pattern, replacement)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
