import { markdownToMediaWiki } from '../src/markdown-converter.js';

describe('markdownToMediaWiki', () => {
    test('converts all heading levels with proper spacing', () => {
        expect(markdownToMediaWiki('# Heading level 1')).toBe('= Heading level 1 =');
        expect(markdownToMediaWiki('## Heading level 2')).toBe('== Heading level 2 ==');
        expect(markdownToMediaWiki('### Heading level 3')).toBe('=== Heading level 3 ===');
        expect(markdownToMediaWiki('#### Heading level 4')).toBe('==== Heading level 4 ====');
        expect(markdownToMediaWiki('##### Heading level 5')).toBe('===== Heading level 5 =====');
        expect(markdownToMediaWiki('###### Heading level 6')).toBe('====== Heading level 6 ======');
    });

    test('converts heading with surrounding text', () => {
        const input = `Some text
# Heading
More text`;
        const expected = `Some text
= Heading =
More text`;
        expect(markdownToMediaWiki(input)).toBe(expected);
    });

    test('converts code blocks', () => {
        expect(markdownToMediaWiki('```\ncode\n```')).toBe('<pre>\ncode\n</pre>');
        expect(markdownToMediaWiki('```javascript\nlet x = 1;\n```'))
            .toBe('<source lang="javascript">\nlet x = 1;\n</source>');
        expect(markdownToMediaWiki('```python\nprint("Hello")\n```'))
            .toBe('<source lang="python">\nprint("Hello")\n</source>');
        expect(markdownToMediaWiki('`inline code`')).toBe('<code>inline code</code>');
    });

    test('converts heading with surrounding text', () => {
        const input = `Some text
# Heading
More text`;
        const expected = `Some text
= Heading =
More text`;
        expect(markdownToMediaWiki(input)).toBe(expected);
    });

    test('converts formatting', () => {
        expect(markdownToMediaWiki('*italic*')).toBe("''italic''");
        expect(markdownToMediaWiki('_italic_')).toBe("''italic''");
        expect(markdownToMediaWiki('**bold**')).toBe("'''bold'''");
        expect(markdownToMediaWiki('__bold__')).toBe("'''bold'''");
        expect(markdownToMediaWiki('~~strikethrough~~')).toBe("<s>strikethrough</s>");
    });

    test('converts lists', () => {
        expect(markdownToMediaWiki('* Item')).toBe('* Item');
        //expect(markdownToMediaWiki('   * Item')).toBe('* Item');
        expect(markdownToMediaWiki('* Item1\n* Item2\n* Item3')).toBe('* Item1\n* Item2\n* Item3');
        expect(markdownToMediaWiki('1. First')).toBe('# First');
    });


    test('converts ordered lists simple', () => {
        expect(markdownToMediaWiki('1. First')).toBe('# First');
        expect(markdownToMediaWiki('1. One\n2. Two\n3. Three')).toBe('# One\n# Two\n# Three');
    });

    test('converts nested lists', () => {
        const input = `1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
        1. Sub-indented item
        2. Sub-indented item
4. Fourth item`;
        const expected = `# First item
# Second item
# Third item
## Indented item
## Indented item
### Sub-indented item
### Sub-indented item
# Fourth item`;
        expect(markdownToMediaWiki(input)).toBe(expected);
    });

    test('converts unordered lists', () => {
        expect(markdownToMediaWiki('* Item')).toBe('* Item');
        expect(markdownToMediaWiki('- Item')).toBe('* Item');
        expect(markdownToMediaWiki('+ Item')).toBe('* Item');
        expect(markdownToMediaWiki('* Item1\n* Item2\n* Item3')).toBe('* Item1\n* Item2\n* Item3');
        expect(markdownToMediaWiki('- Item1\n- Item2\n- Item3')).toBe('* Item1\n* Item2\n* Item3');
        expect(markdownToMediaWiki('+ Item1\n+ Item2\n+ Item3')).toBe('* Item1\n* Item2\n* Item3');
    });

    /*test('converts mixed nested lists', () => {
        const input = `* First level
  * Second level
    * Third level
  * Back to second
* Back to first
1. Numbered first
   * Mixed second
   1. Mixed second numbered`;
        const expected = `* First level
** Second level
*** Third level
** Back to second
* Back to first
# Numbered first
#* Mixed second
## Mixed second numbered`;
        expect(markdownToMediaWiki(input)).toBe(expected);
    });*/
});