// eslint-disable-next-line no-undef
test('Test', () => {
    document.body.innerHTML = `
        <div>
            <input id="target" value="test" />
        </div>
    `;
    const target = document.querySelector('#target');
    // eslint-disable-next-line no-undef
    expect(target.value).toBe('test');
});
