![valkyrie - the compiler](./valkyrie.webp)

# Valkyrie - The compiler

## Regular expression used to render <strong></strong> tags

```javascript
const str = "This is ***** of the part and **at 7:00AM**, we go **there**.";
const newStr = str.replace(/(\*\*)(?=\S)(.+?)(?<=\S)\1/g, "<strong>$2</strong>");
console.log(newStr);
// This is ***** of the part and <strong>at 7:00AM</strong>, we go <strong>there</strong>.
```

Explanation:

- `(\*\*)` is a capturing group that matches two asterisks.
- `(?=\S)` is a positive lookahead that ensures the next character is not a whitespace, so we don't start with empty space.
- `(.+?)` captures one or more characters non-greedily.
- `(?<=\S)` is a positive lookbehind that ensures the character before the closing `**` is not a whitespace, so we don't end with empty space.
- `\1` refers back to the first capturing group (the opening `**`).
- The global flag `g` ensures all occurrences are replaced.
