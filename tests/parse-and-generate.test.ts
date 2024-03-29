import parseAndGenerate from '../src/parse-and-generate'

describe('parse-and-generate', () => {
    let input: string

    it('should return <h1>', () => {
        input = '# Sample title'

        expect(parseAndGenerate(input)).toBe('<h1>Sample title</h1>')
    })

    it('should return <p>', () => {
        input = 'Sample text'

        expect(parseAndGenerate(input)).toBe('<p>Sample text</p>')
    })

    it('should return <a> with text', () => {
        input = '[Example](https://example.com)'

        expect(parseAndGenerate(input)).toBe(
            '<a href="https://example.com">Example</a>'
        )
    })

    it('should return a simple <a>', () => {
        input = '(https://example.com)'

        expect(parseAndGenerate(input)).toBe(
            '<a href="https://example.com">https://example.com</a>'
        )
    })

    it('should return <p> with a simple link', () => {
        input = 'This is a link: (https://example.com)'

        expect(parseAndGenerate(input)).toBe(
            '<p>This is a link: <a href="https://example.com">https://example.com</a></p>'
        )
    })

    it('should return <p>', () => {
        input = 'Wrong link: https://example.com'

        expect(parseAndGenerate(input)).toBe(
            '<p>Wrong link: https://example.com</p>'
        )
    })

    it('should return <p> with a text link', () => {
        input =
            'This is a link: [Example](https://example.com), and another: [WOW](https://wow.ca)'

        expect(parseAndGenerate(input)).toBe(
            '<p>This is a link: <a href="https://example.com">Example</a>, and another: <a href="https://wow.ca">WOW</a></p>'
        )
    })

    it('should return <p> with <a>', () => {
        input = '[Fail] (https://fail.com)'

        expect(parseAndGenerate(input)).toBe(
            '<p>[Fail] <a href="https://fail.com">https://fail.com</a></p>'
        )
    })

    it('should return <ul> with a single item', () => {
        input = '- List item'

        expect(parseAndGenerate(input)).toBe('<ul><li>List item</li></ul>')
    })

    it('should return flat <ul>', () => {
        input = `
            - List item
            - Another item
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>List item</li><li>Another item</li></ul>'
        )
    })

    it('should return a nested <ul>', () => {
        input = `
            - List item
                - Nested item
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>List item<ul><li>Nested item</li></ul></li></ul>'
        )
    })

    it('should return a nested and un-nested <ul>', () => {
        input = `
            - List item
                - Nested item
                    - Another nested item
            - First level item
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>List item<ul><li>Nested item<ul><li>Another nested item</li></ul></li></ul></li><li>First level item</li></ul>'
        )
    })

    it('should return a set of flat <ol> and <ul> (<ol> does not have concept of nesting)', () => {
        input = `
            1. Ordered item
            2. Another ordered item
                - Unordered item
                - Another unordered item
        `

        expect(parseAndGenerate(input)).toBe(
            '<ol start="1"><li>Ordered item</li><li>Another ordered item<ul><li>Unordered item</li><li>Another unordered item</li></ul></li></ol>'
        )
    })

    it('should return a nested <ul> with <ol>', () => {
        input = `
            - First item
            - Second item
                1. Ordered item
                2. Another ordered item
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>First item</li><li>Second item<ol start="1"><li>Ordered item</li><li>Another ordered item</li></ol></li></ul>'
        )
    })

    it('should return <ol> while respecting the first number', () => {
        input = `
            33. First item
            50. Second item
            102. Third item
        `

        expect(parseAndGenerate(input)).toBe(
            '<ol start="33"><li>First item</li><li>Second item</li><li>Third item</li></ol>'
        )
    })

    it('should return a <ul> with <a>', () => {
        input = `
            - List item [Example](https://example.com), yes.
                - Nested item => (https://example.com), eh?
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>List item <a href="https://example.com">Example</a>, yes.<ul><li>Nested item => <a href="https://example.com">https://example.com</a>, eh?</li></ul></li></ul>'
        )
    })

    it('should return a complex list with nest cancelation', () => {
        input = `
            1. One1
                1. Two
            - Three
                3. Four
        `

        expect(parseAndGenerate(input)).toBe(
            '<ol start="1"><li>One1<ol start="1"><li>Two</li></ol></li><li>Three<ol start="3"><li>Four</li></ol></li></ol>'
        )
    })

    it('should return a complex list while forcing parent list type for the same hierarchy', () => {
        input = `
            1. One2
                1. Two
                - Three
                3. Four
        `

        expect(parseAndGenerate(input)).toBe(
            '<ol start="1"><li>One2<ol start="1"><li>Two</li><li>Three</li><li>Four</li></ol></li></ol>'
        )
    })

    it('should return a complex list that allows different list type for different depth', () => {
        input = `
            1. One3
                1. Two
                    - Three
                3. Four
        `

        expect(parseAndGenerate(input)).toBe(
            '<ol start="1"><li>One3<ol start="1"><li>Two<ul><li>Three</li></ul></li><li>Four</li></ol></li></ol>'
        )
    })

    it('should return a complex list with a simple nest cancelation', () => {
        input = `
            - One4
                - Two
                - Three
                    - Four
                - Five
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>One4<ul><li>Two</li><li>Three<ul><li>Four</li></ul></li><li>Five</li></ul></li></ul>'
        )
    })

    it('should return a complex list with three-level nesting', () => {
        input = `
            - One5
                - Two
                - Three
                    - Four
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>One5<ul><li>Two</li><li>Three<ul><li>Four</li></ul></li></ul></li></ul>'
        )
    })

    it('should return an ordered list with unordered list nesting', () => {
        input = `
            1. One
            2. Two
                - P1
                - P2
        `

        expect(parseAndGenerate(input)).toBe(
            '<ol start="1"><li>One</li><li>Two<ul><li>P1</li><li>P2</li></ul></li></ol>'
        )
    })

    it('should return a complex nested list while forcing the same list type to siblings', () => {
        input = `
            - Super 1
            1. Super 10
                3. Super 20
                    - Super 30 [Google](https://www.google.com/) was.
                        - Super 40
                        - Super 41
                    - Super 31
                    - Super 32
                - Super 21
            - Super 2
        `

        expect(parseAndGenerate(input)).toBe(
            '<ul><li>Super 1</li><li>Super 10<ol start="3"><li>Super 20<ul><li>Super 30 <a href="https://www.google.com/">Google</a> was.<ul><li>Super 40</li><li>Super 41</li></ul></li><li>Super 31</li><li>Super 32</li></ul></li><li>Super 21</li></ol></li><li>Super 2</li></ul>'
        )
    })

    it('should return empty string', () => {
        input = `
            <!-- 
                This is a comment
            -->
        `

        expect(parseAndGenerate(input)).toBe('')
    })

    it('should return <img>', () => {
        input = '![Alt text](https://example.com/image.jpg)'

        expect(parseAndGenerate(input)).toBe(
            '<img src="https://example.com/image.jpg" alt="Alt text" />'
        )
    })

    it('should return <img> without alt text', () => {
        input = '![](https://example.com/image.jpg)'

        expect(parseAndGenerate(input)).toBe(
            '<img src="https://example.com/image.jpg" alt="" />'
        )
    })

    it('should return an empty <img>', () => {
        input = '![]()'

        expect(parseAndGenerate(input)).toBe('<img src="" alt="" />')
    })

    // TODO: make this happen
    it.skip('should return an <a> within <p> tag', () => {
        input = '![Alt text(http://example.com/image.jpg)'

        expect(parseAndGenerate(input)).toBe(
            '<p>![Alt text<a href="http://example.com/image/jpg">(http://example.com/image/jpg)</a></p>'
        )
    })
})
