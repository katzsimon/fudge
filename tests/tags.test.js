import Fudge from '../src/fudge';

// eslint-disable-next-line no-undef
test('Fudge - Tags - Add and Remove Tags', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target" data-options="One,Two,Three" data-mode="tags" />
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target);
    fudgeInstance.open();
    fudgeInstance.addTag('One');
    fudgeInstance.addTag('Two');
    // eslint-disable-next-line no-undef
    expect(target.value).toBe('One,Two,');
    fudgeInstance.removeTag('Two');
    // eslint-disable-next-line no-undef
    expect(target.value).toBe('One,');
});
