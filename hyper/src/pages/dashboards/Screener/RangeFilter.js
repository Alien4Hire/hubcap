import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { formatLargeNumber } from '../../../utils';

const RangeFilter = ({ id, label, incrementNumber, value, minValue, maxValue, onChange }) => {
    const onSliderChange = (changedValue) => {
        console.log('changedValue', changedValue);
        // onChange([
        //     changedValue[0] === 0 ? minValue : changedValue[0] * incrementNumber,
        //     changedValue[1] === 100 ? maxValue : changedValue[1] * incrementNumber,
        // ]);
        onChange(changedValue);
    };

    return (
        <Row>
            <Col>{label}</Col>
            <Col>
                <Input disabled type="text" id={`minRange_${id}`} placeholder="" value={formatLargeNumber(value[0])} />
            </Col>
            <Col>
                <Range
                    allowCross={false}
                    value={[value[0], value[1]]}
                    min={minValue}
                    max={maxValue}
                    step={incrementNumber}
                    onChange={onSliderChange}
                />
            </Col>
            <Col>
                <Input disabled type="text" id={`maxRange_${id}`} placeholder="" value={formatLargeNumber(value[1])} />
            </Col>
        </Row>
    );
};

export default RangeFilter;
