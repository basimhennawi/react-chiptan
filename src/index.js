import React from 'react';
import PropTypes from 'prop-types';
import { flickerCanvas, flickerCode } from './flicker';

class ChipTAN extends React.Component {
    constructor(props) {
        super(props);

        const { data, width, height, bgColor, barColor } = props;

        this.state = {
            canvas: new flickerCanvas(width, height, bgColor, barColor),
            code: new flickerCode(data),
        };

        this.stopFlicker();
    }

    componentDidMount() {
        const { data } = this.props;
        let { canvas, code } = this.state;

        if (!data) return;

        document
            .getElementById('flickercontainer')
            .appendChild(canvas.getCanvas());

        canvas.setCode(code);

        this.startFlicker();
    }

    startFlicker() {
        this.interval = setInterval(this.step.bind(this), 50);
    }

    stopFlicker() {
        clearInterval(this.interval);
    }

    step() {
        this.state.canvas.step();
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
    bgColor: '#000',
    barColor: '#fff',
};

export default ChipTAN;
