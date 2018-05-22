import React from 'react';
import PropTypes from 'prop-types';

let code, canvas, interval;

function flickerCode(newcode) {
    let code = newcode.toUpperCase().replace(/[^a-fA-F0-9]/g, '');

    const toHex = (n, minlen) => {
        let s = n.toString(16).toUpperCase();
        while (s.length < minlen) {
            s = '0' + s;
        }

        return s;
    }

    const quersumme = (n) => {
        let q = 0;
        while (n != 0) {
            q += n % 10;
            n = Math.floor(n / 10);
        }

        return q;
    }

    const getPayload = () => {
        let i = 0;
        let payload = '';

        let len = parseInt (code.slice (0, 2), 16);
        i += 2;
        while (i < code.length-2) {
            i += 1;
            len = parseInt (code.slice (i, i+1), 16);
            i += 1;
            payload += code.slice (i, i+len*2);
            i += len*2;
        }
        return payload;
    }

    const checksum = () => {
        let len = code.length / 2 - 1;
        code = toHex (len, 2) + code.substr (2);

        let luhndata = getPayload();
        let luhnsum = 0;
        for (let i = 0; i < luhndata.length; i += 2) {
            luhnsum += (1*parseInt (luhndata[i], 16)) + quersumme (2*parseInt (luhndata[i+1], 16));
        }
        luhnsum = (10 - (luhnsum % 10)) % 10;
        code = code.substr (0, code.length-2) + toHex (luhnsum, 1) + code.substr (code.length-1);

        let xorsum = 0;
        for (let i = 0; i < code.length-2; i++) {
            xorsum ^= parseInt (code[i], 16);
        }
        code = code.substr (0, code.length-1) + toHex (xorsum, 1);
    }

    this.getCode = () => code;

    checksum();
}

function flickerCanvas(width, height, bgColor, barColor) {
    let code;
    let halfbyteid, clock, bitarray, canvas, ctx;

    this.reset = () => {
        halfbyteid = 0;
        clock = 1;
    }

    const setup = () => {
        let bits = new Object();
        bits['0'] = [0, 0, 0, 0, 0];
        bits['1'] = [0, 1, 0, 0, 0];
        bits['2'] = [0, 0, 1, 0, 0];
        bits['3'] = [0, 1, 1, 0, 0];
        bits['4'] = [0, 0, 0, 1, 0];
        bits['5'] = [0, 1, 0, 1, 0];
        bits['6'] = [0, 0, 1, 1, 0];
        bits['7'] = [0, 1, 1, 1, 0];
        bits['8'] = [0, 0, 0, 0, 1];
        bits['9'] = [0, 1, 0, 0, 1];
        bits['A'] = [0, 0, 1, 0, 1];
        bits['B'] = [0, 1, 1, 0, 1];
        bits['C'] = [0, 0, 0, 1, 1];
        bits['D'] = [0, 1, 0, 1, 1];
        bits['E'] = [0, 0, 1, 1, 1];
        bits['F'] = [0, 1, 1, 1, 1];

        code = '0FFF' + code;

        bitarray = new Array();
        for (let i = 0; i < code.length; i += 2) {
            bitarray[i] = bits[code[i+1]]
            bitarray[i+1] = bits[code[i]]
        }
    }

    const createCanvas = (width, height, bgColor, barColor) => {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
        }

        ctx.fillStyle = bgColor;
        ctx.fillRect (0, 0, canvas.width, canvas.height);
    }

    this.step = () => {
        let margin = 7;
        let barwidth = canvas.width / 5;

        bitarray[halfbyteid][0] = clock;

        for (let i = 0; i < 5; i++) {
            if (bitarray[halfbyteid][i] == 1) {
                ctx.fillStyle = barColor;
            } else {
                ctx.fillStyle = bgColor;
            }
            ctx.fillRect (i*barwidth+margin, margin, barwidth-2*margin, canvas.height-2*margin);
        }

        clock--;
        if (clock < 0) {
            clock = 1;

            halfbyteid++;
            if (halfbyteid >= bitarray.length) {
                halfbyteid = 0;
            }

        }

        return 0;
    }

    this.getCanvas = () => canvas;

    this.setCode = newcode => {
        code = newcode.getCode();
        setup();
        this.reset();
    }

    createCanvas(width, height, bgColor, barColor);
}

class ChipTAN extends React.Component {
    componentDidMount() {
        const { data, width, height, bgColor, barColor } = this.props;

        if (!data) return;

        this.stopFlicker();

        canvas = new flickerCanvas(width, height, bgColor, barColor);
        document.getElementById('flickercontainer').appendChild(canvas.getCanvas());

        code = new flickerCode(data);
        canvas.setCode(code);

        this.startFlicker();
    }

    startFlicker() {
        interval = window.setInterval(this.step, 50);
    }

    stopFlicker() {
        window.clearInterval(interval);
    }

    step() {
        canvas.step();
    }

    render() {
        return (        
            <div id='flickercontainer'>
            </div>
        );
    }
}

ChipTAN.propTypes = {
    data: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    bgColor: PropTypes.string,
    barColor: PropTypes.string,
};

ChipTAN.defaultProps = {
    data: '',
    width: 205,
    height: 100,
    bgColor: '#000000',
    barColor: '#ffffff',
};

export default ChipTAN;
