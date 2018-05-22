import React from 'react';
import { render} from 'react-dom';
import ChipTAN from '../../src';

const App = () => (
    <ChipTAN
        data={'17850120452019980412345678041234567804123456789E'}
        width={400}
        height={200}
        bgColor='#000000'
        barColor='#ffffff'
    />
);

render(<App />, document.getElementById("root"));
