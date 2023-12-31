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
            '<ul><li>List item</li><ul><li>Nested item</li></ul></ul>'
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
            '<ul><li>List item</li><ul><li>Nested item</li><ul><li>Another nested item</li></ul></ul><li>First level item</li></ul>'
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
            '<ol start="1"><li>Ordered item</li><li>Another ordered item</li></ol><ul><li>Unordered item</li><li>Another unordered item</li></ul>'
        )
    })

    // TODO: make this work
    // it('should return a nested <ul> with <ol>', () => {
    //     input = `
    //         - First item
    //         - Second item
    //             1. Ordered item
    //             2. Another ordered item
    //     `

    //     expect(parseAndGenerate(input)).toBe(
    //         '<ul><li>First item</li><li>Second item<ol start="1"><li>Ordered item</li><li>Another ordered item</li></ol></li></ul>'
    //     )
    // })

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
            '<ul><li>List item <a href="https://example.com">Example</a>, yes.</li><ul><li>Nested item => <a href="https://example.com">https://example.com</a>, eh?</li></ul></ul>'
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
})
