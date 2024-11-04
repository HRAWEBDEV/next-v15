'use client';
import { memo } from 'react';

const Two = memo(function Two() {
 console.log('render component two');

 return <div>Two</div>;
});

export default Two;
