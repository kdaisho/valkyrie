![valkyrie - the compiler](./valkyrie.webp)

# Valkyrie - The compiler

Valkyrie is a compiler that takes a markdown file and converts them into an HTML file. It is built on top of Bun.js.

## Contribution guide
### Requirements

[Bun.js](https://bun.sh/)

### Steps

1. Install dependencies (either `bun install` or `npm install` should work)
```bash
pnpm install
```
2. Build
```bash
bun bd
```
3. Register the current package (valkyrie) as a "linkable" package.
```bash
bun link
```
4. Run valkyrie against an example file
```bash
valkyrie run ./examples/examples.md
```

## Markdown to HTML - How I check I'm doing it right

Alright, so it's 2024 and it's kind of wild, but there's still no go-to spec for converting Markdown to HTML. Guess it's because Markdown has like a zillion flavors and nobody's really nailed down a one-size-fits-all standard. 🤷

So, what am I using to make sure my compiler is doing its job right? I've been bouncing between these two:

1. **GitHub**: These guys have a pretty solid handle on Markdown, but man, their rules for nested lists can drive you nuts.

2. **[Free Markdown to HTML Converter](https://markdowntohtml.com/)**: This one's got its oddities, sure, but overall, it's been the most reliable for me.

## Development notes
### Regular expression used to create `strong` element

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
