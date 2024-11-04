'use client';
import { useTestContext } from './Context';
import Two from './Two';
import Button from '@mui/material/Button';

export default function One() {
 const { value, setValue } = useTestContext();
 console.log('render component one', value);

 return (
  <div>
   <Button
    onClick={() => {
     setValue('new etst');
    }}
   >
    change context
   </Button>
   <Two />
  </div>
 );
}
