import re

with open("src/components/Dashboard.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix 1: Fallback try local /api/trackers
content = content.replace(
    """if (ye.ok) {
          const Be = await ye.json();
          w(Be);
        }""",
    """if (ye.ok) {
          let Be = await ye.json();
          if (Be && Be.data && Array.isArray(Be.data)) Be = Be.data;
          if (Array.isArray(Be)) {
             w(Be.map((t: any) => ({ ...t, logs: Array.isArray(t.logs) ? t.logs : [] })));
          } else { w([]); }
        }"""
)

# Fix 2: Last resort fallback
content = content.replace(
    """if (ye.ok) { const Be = await ye.json(); w(Be); }""",
    """if (ye.ok) { let Be = await ye.json(); if (Be && Be.data && Array.isArray(Be.data)) Be = Be.data; if (Array.isArray(Be)) w(Be.map((t: any) => ({ ...t, logs: Array.isArray(t.logs) ? t.logs : [] }))); }"""
)

# Fix 3: setInterval fallback
content = content.replace(
    """.then((ye) => { ye && w(ye); })""",
    """.then((ye) => { if (ye) { let Be = ye; if (Be && Be.data && Array.isArray(Be.data)) Be = Be.data; if (Array.isArray(Be)) w(Be.map((t: any) => ({ ...t, logs: Array.isArray(t.logs) ? t.logs : [] }))); } })"""
)

# Fix 4: mapBackendTracker logs
content = content.replace(
    """logs: raw.logs ? raw.logs.map((l: any) => ({""",
    """logs: Array.isArray(raw.logs) ? raw.logs.map((l: any) => ({"""
)

# Fix 5: Ensure adData is an array
content = content.replace(
    """if (adData.success && adData.distribution) {
            setActivityDistData(adData.distribution);
          }""",
    """if (adData.success && Array.isArray(adData.distribution)) {
            setActivityDistData(adData.distribution);
          } else if (Array.isArray(adData)) {
            setActivityDistData(adData);
          }"""
)

with open("src/components/Dashboard.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed!")
