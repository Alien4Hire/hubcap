import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const UpdatePayment = () => {
    const [reloadCount, SetCount] = useState(1);

    const reloaded = () => {
        window.location.reload(true);
        if (reloadCount === 1) {
            SetCount(2);
        }
    };

    useEffect(() => {
        reloaded();
    }, []);

    return <h1>Update Payment</h1>;
};

export default UpdatePayment;
