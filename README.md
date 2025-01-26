# Markdown to MediaWiki Converter

An online tool to convert Markdown documents to MediaWiki syntax.

## Features

- Converts various Markdown syntax (headings, lists, code blocks)
- Customizable horizontal line and heading bold treatments
- Drag-and-drop file upload and text paste support
- Nested numbered lists up to 3 levels
- Bilingual interface (English/Chinese)

## Examples

### Markdown Input
```markdown
# Heading
* Item 1
* Item 2

Code:
```python
print("Hello")
```
```

### MediaWiki Output
```wiki
= Heading =
* Item 1
* Item 2

Code:
<source lang="python">
print("Hello")
</source>
```

## Usage

1. Paste Markdown text or drag-and-drop files (.md/.markdown/.txt)
2. Optional settings:
    - Remove horizontal lines
    - Disable bold headings
3. View and copy conversion results

## Technical Details

- Frontend: HTML, JavaScript, Bootstrap 5
- Supported formats: .md, .markdown, .txt
- RegExp-based syntax conversion

## Development

Project structure:

- `index.html`: UI and interaction logic
- `markdown-converter.js`: Core conversion functionality

## License

All files except `upload.png` are licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
