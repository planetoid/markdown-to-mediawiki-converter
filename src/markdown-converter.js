export function markdownToMediaWiki(markdown, options = {}) {
    let wiki = markdown;
    const { removeHr = false } = options;

    // Code blocks first
    wiki = wiki.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
        const escapedCode = code.trim();
        return lang ? `<source lang="${lang}">\n${escapedCode}\n</source>` : `<pre>\n${escapedCode}\n</pre>`;
    });
    wiki = wiki.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Store and process headings
    const headings = [
        [/^######\s+(.*)$/gm, 6],
        [/^#####\s+(.*)$/gm, 5],
        [/^####\s+(.*)$/gm, 4],
        [/^###\s+(.*)$/gm, 3],
        [/^##\s+(.*)$/gm, 2],
        [/^#\s+(.*)$/gm, 1]
    ];

    headings.forEach(([pattern, level]) => {
        wiki = wiki.replace(pattern, (_, content) =>
            `${'='.repeat(level)} ${content} ${'='.repeat(level)}`
        );
    });

    // Format text
    wiki = wiki.replace(/\*\*\*([^*\n]+?)\*\*\*/g, "'''''$1'''''")
        .replace(/\*\*([^*\n]+?)\*\*/g, "'''$1'''")
        .replace(/__([^_\n]+?)__/g, "'''$1'''")
        .replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, "''$1''")
        .replace(/_([^_\n]+?)_/g, "''$1''")
        .replace(/~~([^~\n]+?)~~/g, "<s>$1</s>");

    // Process lists
    const lines = wiki.split('\n');
    const processedLines = lines.map(line => {
        const leadingSpaces = line.match(/^[ ]*/)[0].length;
        const nestingLevel = Math.floor(leadingSpaces / 4);
        const trimmedLine = line.trim();

        if (trimmedLine.match(/^\d+\./)) {
            return '#'.repeat(nestingLevel + 1) + ' ' + trimmedLine.replace(/^\d+\.\s*/, '');
        } else if (trimmedLine.match(/^[*+-]/)) {
            return '*'.repeat(nestingLevel + 1) + ' ' + trimmedLine.replace(/^[*+-]\s*/, '');
        }
        return line;
    });
    wiki = processedLines.join('\n');

    // Links and clean-up
    wiki = wiki.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$2 $1]')
        .replace(/\n{3,}/g, '\n\n');

    // Horizontal rules
    if (!removeHr) {
        wiki = wiki.replace(/^[\s]*[-_*][-_*\s]*$/gm, '----');
    } else {
        wiki = wiki.replace(/^[\s]*[-_*][-_*\s]*$/gm, '')
            .replace(/^-{4,}$/gm, '')
            .replace(/^[\s\t]+$/gm, '');
    }

    return wiki.trim();
}