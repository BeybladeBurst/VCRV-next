import { useState } from 'react';
export class UseState {
    constructor(value) {
        [this.value, this.set] = useState(value);
    }
}