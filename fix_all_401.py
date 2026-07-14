import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_fetch_tickets = r'''      const res = await fetch\("/api/tickets", \{
        headers: \{ "Authorization": `Bearer \$\{token\}` \}
      \}\);
      if \(res\.ok\) \{'''

repl_fetch_tickets = r'''      const res = await fetch("/api/tickets", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.status === 401) {
        onLogout();
        return;
      }
      if (res.ok) {'''

content = re.sub(find_fetch_tickets, repl_fetch_tickets, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
