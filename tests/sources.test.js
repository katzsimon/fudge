import Fudge from '../src/fudge';

// eslint-disable-next-line no-undef
test('Fudge - Sources - Source data-options', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target" data-options="One,Two,Three"/>
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target);
    const fudgeOptions = fudgeInstance.options;
    const expectedOptions = [
        { value: 'One', text: 'One' },
        { value: 'Two', text: 'Two' },
        { value: 'Three', text: 'Three' },
    ]; // eslint-disable-next-line no-undef
    expect(JSON.stringify(fudgeOptions) === JSON.stringify(expectedOptions)).toBe(true);
});

// eslint-disable-next-line no-undef
test('Fudge - Sources - Source Select Options', () => {
    document.body.innerHTML = `
        <div>
            <select id="fudge_target">
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
            </select>
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target);
    const fudgeOptions = fudgeInstance.options;
    const expectedOptions = [
        { value: 'One', text: 'One' },
        { value: 'Two', text: 'Two' },
        { value: 'Three', text: 'Three' },
    ]; // eslint-disable-next-line no-undef
    expect(JSON.stringify(fudgeOptions) === JSON.stringify(expectedOptions)).toBe(true);
});

// eslint-disable-next-line no-undef
test('Fudge - Sources - Source Constructor Options Object', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target"/>
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target, {
        options: [
            { value: 'One', text: 'One' },
            { value: 'Two' },
            { value: 'Three' },
        ],
    });
    const fudgeOptions = fudgeInstance.options;
    const expectedOptions = [
        { value: 'One', text: 'One' },
        { value: 'Two', text: 'Two' },
        { value: 'Three', text: 'Three' },
    ];
    // eslint-disable-next-line no-undef
    expect(JSON.stringify(fudgeOptions) === JSON.stringify(expectedOptions)).toBe(true);
});

// eslint-disable-next-line no-undef
test('Fudge - Sources - Source Constructor Options String', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target"/>
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target, {
        options: ['::Please Select', 'Four', 'Five', 'Six'],
    });
    const fudgeOptions = fudgeInstance.options;
    const expectedOptions = [
        { value: '', text: 'Please Select' },
        { value: 'Four', text: 'Four' },
        { value: 'Five', text: 'Five' },
        { value: 'Six', text: 'Six' },
    ];
    // eslint-disable-next-line no-undef
    expect(JSON.stringify(fudgeOptions) === JSON.stringify(expectedOptions)).toBe(true);
});

// eslint-disable-next-line no-undef
test('Fudge - Sources - Source Constructor Options String', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target"/>
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target, {
        options: '::Please Select,Four,Five,Six',
    });
    const fudgeOptions = fudgeInstance.options;
    const expectedOptions = [
        { value: '', text: 'Please Select' },
        { value: 'Four', text: 'Four' },
        { value: 'Five', text: 'Five' },
        { value: 'Six', text: 'Six' },
    ];
    // eslint-disable-next-line no-undef
    expect(JSON.stringify(fudgeOptions) === JSON.stringify(expectedOptions)).toBe(true);
});

// eslint-disable-next-line no-undef
test('Fudge - Sources - Source Constructor Options JSON String', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target"/>
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target, {
        options:
            '[{"value":"One","text":"One"},{"value":"Two"},{"value":"Three"}]',
    });
    const fudgeOptions = fudgeInstance.options;
    const expectedOptions = [
        { value: 'One', text: 'One' },
        { value: 'Two', text: 'Two' },
        { value: 'Three', text: 'Three' },
    ];
    // eslint-disable-next-line no-undef
    expect(JSON.stringify(fudgeOptions) === JSON.stringify(expectedOptions)).toBe(true);
});
