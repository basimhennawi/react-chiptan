react-chiptan
-------------

React component renders [chipTAN](https://github.com/basimhennawi/react-chiptan/blob/master/ChipTAN.md) flicker code.

<img src="https://raw.githubusercontent.com/basimhennawi/react-chiptan/master/demo.gif">

Installing
------------
```
$ npm i -S react-chiptan
```

[Example](https://github.com/basimhennawi/react-chiptan/tree/master/examples/src)
--------------

```javascript
import React from 'react';
import { render } from 'react-dom';
import ChipTAN from 'react-chiptan';

const App = () => (
    <ChipTAN
        data={'17850120452019980412345678041234567804123456789E'}
        width={205}
        height={100}
        bgColor='black'
        barColor='white'
    />
);

render(<App />, document.getElementById("root"));
```

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | string | '' | ChipTAN [code](https://github.com/basimhennawi/react-chiptan/blob/master/Code.md) to render. |
| width | number | 205 | Canvas width. |
| height | number | 100 | Canvas height. |
| bgColor | string | '#000' | Canvas background color. |
| barColor | string | '#fff' | Vertical bar(s) in canvas color. |

Contributing
--------------
To contribute, follow these steps:
- Fork this repo.
- Clone your fork.
- Run `npm install`
- Run `npm start`
- Goto `localhost:3001`
- Add your patch then push to your fork and submit a pull request

Acknowledgments
--------------
Inspired by [chipTAN Flickercodes article](https://6xq.net/flickercodes)

License
---------
MIT @[Basim Hennawi](http://basimhennawi.com)