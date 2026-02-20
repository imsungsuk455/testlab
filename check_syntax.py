import ast
# import js2py # Not available probably, so I'll just do a basic check

content = open('script.js', 'r', encoding='utf-8').read()

# Check for balanced braces
stack = []
for i, c in enumerate(content):
    if c == '{': stack.append(('{', i))
    elif c == '}': 
        if not stack or stack[-1][0] != '{':
            print(f"Unmatched }} at index {i}")
        else:
            stack.pop()

if stack:
    print(f"Unclosed {{ at indices: {[s[1] for s in stack]}")
else:
    print("Braces are balanced.")

# Check for balanced brackets
stack = []
for i, c in enumerate(content):
    if c == '[': stack.append(('[', i))
    elif c == ']': 
        if not stack or stack[-1][0] != '[':
            print(f"Unmatched ] at index {i}")
        else:
            stack.pop()

if stack:
    print(f"Unclosed [ at indices: {[s[1] for s in stack]}")
else:
    print("Brackets are balanced.")
