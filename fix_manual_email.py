with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

# Remove overflow-x-auto and whitespace-nowrap from the main table wrapper
content = content.replace(
    '<div className="overflow-x-auto">\n                <table className="w-full text-left text-[13px] whitespace-nowrap">',
    '<div>\n                <table className="w-full text-left text-[13px]">'
)

content = content.replace(
    '<div className="overflow-x-auto">\n              <table className="w-full text-left text-[13px] whitespace-nowrap">',
    '<div>\n              <table className="w-full text-left text-[13px]">'
)

content = content.replace(
    '<div className="overflow-x-auto">\n              <table className="w-full text-left text-[13px]">',
    '<div>\n              <table className="w-full text-left text-[13px]">'
)

# Replace table-auto with table-fixed for timeline table to prevent overflow
content = content.replace(
    '<table className="w-full text-left text-xs table-auto">',
    '<table className="w-full text-left text-xs">'
)


with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
