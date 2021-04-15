import Fudge from '../src/fudge';

const keyDown = new KeyboardEvent('keyup', { key: 'ArrowDown' });
const keyUp = new KeyboardEvent('keyup', { key: 'ArrowUp' });
const keyEnter = new KeyboardEvent('keyup', { key: 'Enter' });
const keyTab = new KeyboardEvent('keydown', { key: 'Tab' });
// eslint-disable-next-line no-undef
test('Fudge - Sources - Source data-options', () => {
    document.body.innerHTML = `
        <div>
            <input id="fudge_target" data-options="One,Two,Three"/>
        </div>
    `;

    const target = document.querySelector('#fudge_target');

    const fudgeInstance = new Fudge(target);
    const fudgeInput = fudgeInstance.input;
    fudgeInstance.open();
    fudgeInstance.close();

    fudgeInstance.addOption('Four');
    fudgeInput.dispatchEvent(keyTab);
    fudgeInput.dispatchEvent(keyDown);
    fudgeInput.dispatchEvent(keyDown);
    fudgeInput.dispatchEvent(keyUp);
    fudgeInput.dispatchEvent(keyDown);
    fudgeInput.dispatchEvent(keyDown);
    fudgeInput.dispatchEvent(keyEnter);

    // eslint-disable-next-line no-undef
    expect(target.value).toBe('Four');
});
