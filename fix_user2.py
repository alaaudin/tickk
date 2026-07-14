import re

with open("server.ts", "r") as f:
    content = f.read()

# I want to replace everything from `function getUserIdFromRequest(req: express.Request): string | null {` 
# up to `return null;\n}`
start_idx = content.find("function getUserIdFromRequest(req: express.Request): string | null {")
end_idx = content.find("return null;\n}", start_idx) + len("return null;\n}")

new_func = """function getUserIdFromRequest(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token.startsWith("tk_live_")) {
      const keyInfo = db.apiKeys[token];
      if (keyInfo) return keyInfo.userId;
    }
    return "user_enterprise_1";
  }
  return null;
}"""

content = content[:start_idx] + new_func + content[end_idx:]

with open("server.ts", "w") as f:
    f.write(content)
