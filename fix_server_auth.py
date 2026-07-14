import re

with open("server.ts", "r") as f:
    content = f.read()

find_auth = r'''    // For normal UI login flow, we can use user email or standard mockup token
    const user = db\.users\.find\(u => u\.id === token \|\| u\.email === token\);
    if \(user\) return user\.id;
  \}
  return null;
\}'''

repl_auth = r'''    // For normal UI login flow, we can use user email or standard mockup token
    let user = db.users.find(u => u.id === token || u.email === token);
    if (!user) {
      // Auto-recover session for sandbox if dev server restarts
      user = {
        id: token,
        email: `sandbox_${token.substring(0, 6)}@test.com`,
        name: "Sandbox User",
        credits: 501,
        createdAt: new Date().toISOString()
      };
      db.users.push(user);
      // saveDatabase(); // Let's avoid constant writes for recovered users
    }
    return user.id;
  }
  return null;
}'''

content = re.sub(find_auth, repl_auth, content)

with open("server.ts", "w") as f:
    f.write(content)
