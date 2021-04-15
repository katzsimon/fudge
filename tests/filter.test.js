import Fudge from '../src/fudge';

const keyEnter = new KeyboardEvent('keyup', { key: 'Enter' });
const keyUp = new CustomEvent('keyup');
// eslint-disable-next-line no-undef
test('Fudge - Filter', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target" data-options="One,Two,Three"/>
        </div>
    `;
    const target = document.querySelector('#fudge_target');
    const fudgeInstance = new Fudge(target);
    const fudgeInput = fudgeInstance.input;
    fudgeInstance.open();
    fudgeInput.value = 'T';
    fudgeInput.dispatchEvent(keyUp);
    fudgeInput.dispatchEvent(keyEnter);
    // eslint-disable-next-line no-undef
    expect(target.value).toBe('Two');
});
