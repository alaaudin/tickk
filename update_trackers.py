import json
with open('tracker_db.json', 'r') as f:
    data = json.load(f)

# Change some emails to use yahoo and icloud
if len(data['trackers']) > 2:
    data['trackers'][0]['recipient'] = 'executive@yahoo.com'
    data['trackers'][2]['recipient'] = 'board@icloud.com'

with open('tracker_db.json', 'w') as f:
    json.dump(data, f, indent=2)

