'use client';
import { useReducer } from 'react';

interface FormFields {
 firstname: string;
 lastname: string;
 age: string | null;
 gender: string | null;
}

// using only the reducer
type FormAction<T extends keyof FormFields> = {
 type: 'change';
 key: T;
 value: FormFields[T];
};

function reducer<T extends keyof FormFields>(
 state: FormFields,
 action: FormAction<T>
) {
 if (action.type == 'change') {
  return {
   ...state,
   [action.key]: action.value || null,
  };
 }
 return state;
}

export default function Form() {
 const [state, dispatch] = useReducer(reducer, {
  firstname: '',
  lastname: '',
  age: null,
  gender: null,
 });

 return (
  <form>
   <h1 className='text-lg capitalize mb-2'>this my form</h1>
   <div className='grid gap-3 [&_label]:inline-block [&_label]:min-w-20 [&_:is(input,select)]:text-black'>
    <fieldset>
     <label htmlFor='firstname'>firstname: </label>
     <input
      type='text'
      name='firstname'
      id='firstname'
      value={state['firstname']}
      onChange={(e) =>
       dispatch({ type: 'change', key: 'firstname', value: e.target.value })
      }
     />
    </fieldset>
    <fieldset>
     <label htmlFor='lastname'>lastname: </label>
     <input
      type='text'
      name='lastname'
      id='lastname'
      value={state['lastname']}
      onChange={(e) =>
       dispatch({ type: 'change', key: 'lastname', value: e.target.value })
      }
     />
    </fieldset>
    <fieldset>
     <label htmlFor='age'>age: </label>
     <input
      type='number'
      name='age'
      id='age'
      value={state['age'] || ''}
      onChange={(e) =>
       dispatch({ type: 'change', key: 'age', value: e.target.value })
      }
     />
    </fieldset>
    <fieldset>
     <label htmlFor='gender'>gender: </label>
     <select
      name='gender'
      id='gender'
      value={state['gender'] || ''}
      onChange={(e) =>
       dispatch({ type: 'change', key: 'gender', value: e.target.value })
      }
     >
      <option value='male'>male</option>
      <option value='female'>female</option>
     </select>
    </fieldset>
   </div>
  </form>
 );
}
