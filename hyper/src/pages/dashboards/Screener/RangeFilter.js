import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { formatLargeNumber } from '../../../utils';

const RangeFilter = ({ id, label, incrementNumber, value, minValue, maxValue, onChange }) => {
    const transformRangeValue = (value, min, max) => {
        let newValue = [...value];
        if (newValue[0] === min && newValue[1] === max) {
            newValue = [];
        } else if (newValue[0] === min) {
            newValue[0] = 'x';
        } else if (newValue[1] === max) {
            newValue[1] = 'x';
        }
        return newValue;
    };

    const onSliderChange = (changedValue) => {
        onChange(changedValue, transformRangeValue(changedValue, minValue, maxValue));
    };

    return (
        <Row>
            <Col className="col-center-left">
                <Label>{label}</Label>
            </Col>
            <Col className="col-center-left">
                <Input disabled type="text" id={`minRange_${id}`} placeholder="" value={formatLargeNumber(value[0])} />
            </Col>
            <Col className="col-center-left">
                <Range
                    allowCross={false}
                    value={[value[0], value[1]]}
                    min={minValue}
                    max={maxValue}
                    step={incrementNumber}
                    onChange={onSliderChange}
                />
            </Col>
            <Col className="col-center-left">
                <Input disabled type="text" id={`maxRange_${id}`} placeholder="" value={formatLargeNumber(value[1])} />
            </Col>
        </Row>
    );
};

export default RangeFilter;
