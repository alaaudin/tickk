import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_fetch_data = r'''      const authRes = await fetch\("/api/auth/me", \{
        headers: \{ "Authorization": `Bearer \$\{token\}` \}
      \}\);
      if \(authRes\.ok\) \{'''

repl_fetch_data = r'''      const authRes = await fetch("/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (authRes.status === 401) {
        toast("Session expired. Please log in again.");
        onLogout();
        return;
      }
      if (authRes.ok) {'''

content = re.sub(find_fetch_data, repl_fetch_data, content)

find_ticket_401 = r'''        toast\(`Failed to submit feedback: \$\{res\.status\} \$\{errData\}`\);
      \}'''

repl_ticket_401 = r'''        if (res.status === 401) {
          toast("Session expired. Please log in again.");
          onLogout();
        } else {
          toast(`Failed to submit feedback: ${res.status} ${errData}`);
        }
      }'''

content = re.sub(find_ticket_401, repl_ticket_401, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
