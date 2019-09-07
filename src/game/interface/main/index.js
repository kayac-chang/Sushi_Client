import {SpinButton} from './SpinButton';
import {Status} from './Status';
import {Option} from './Option';
import {Button} from '../components';

const {assign} = Object;

export function Main(it) {
    const menuButton = Button(it.getChildByName('menu'));

    const optionButton = Button(it.getChildByName('option'));

    optionButton.on('click', openOption);

    const option = Option(it.getChildByName('optionMenu'));

    option.on('OpenExchange', () => it.emit('OpenExchange'));

    SpinButton(it.getChildByName('spin'));

    Status(it.getChildByName('status'));

    return assign(it, {menuButton, whenClickOutsideClose});

    function whenClickOutsideClose(target) {
        const block = it.getChildByName('block');

        block.interactive = true;

        block.once('click', async () => {
            await target.close();

            block.interactive = false;
        });
    }

    async function openOption() {
        await option.open();

        whenClickOutsideClose(option);
    }
}


