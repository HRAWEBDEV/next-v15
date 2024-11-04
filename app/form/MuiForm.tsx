'use client';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useCallback, useDeferredValue } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { formAction } from './formAction';

interface FormFields {
 firstname: string;
 lastname: string;
 age: string | null;
 gender: { key: string; value: string } | null;
}

const errorsConfig: FieldErrors<FormFields> = {
 gender: {
  type: 'required',
  message: 'gender is required',
 },
};

const defaultValues: Partial<FormFields> = {
 firstname: 'younes',
 lastname: '',
 age: null,
 gender: null,
};

async function getGender(): Promise<NonNullable<FormFields['gender']>> {
 return new Promise((res) => {
  setTimeout(() => {
   res({ key: '1', value: 'female' });
  }, 2000);
 });
}

export default function MuiForm() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const queryFirstname = searchParams.get('firstname') || '';
 const queryLastname = searchParams.get('lastname') || '';
 const queryAge = searchParams.get('age') || null;
 //
 const {
  register,
  control,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
 } = useForm<FormFields>({
  errors: errorsConfig,
  defaultValues: {
   ...defaultValues,
   firstname: queryFirstname || '',
   lastname: queryLastname || '',
   age: queryAge || null,
  },
 });
 //
 const [firstnameValue, lastnameValue, ageValue, genderValue] = watch([
  'firstname',
  'lastname',
  'age',
  'gender',
 ]);

 const firstnameDefferValue = useDeferredValue(firstnameValue);

 console.log(firstnameValue);
 console.log('defer value', firstnameDefferValue);

 //
 const getDate = useCallback(function () {}, []);
 //
 function onSubmit(formValues: FormFields): void {
  formAction();
 }
 // submiting on error
 function onError(errors: FieldErrors<FormFields>) {}

 async function changeGender(): Promise<void> {
  getGender().then((res) => setValue('gender', res));
 }
 // set values to url
 useEffect(() => {
  setTimeout(() => {
   const url = new URL(window.location.href);
   url.searchParams.set('firstname', firstnameValue);
   url.searchParams.set('lastname', lastnameValue);
   url.searchParams.set('age', ageValue || '');
   url.searchParams.set('gender', genderValue?.value || '');
   router.push(url.toString());
  });
 }, [firstnameValue, lastnameValue, ageValue, genderValue, router]);
 // get values from url
 useEffect(() => {
  console.log('here');

  setValue('firstname', queryFirstname || '');
  setValue('lastname', queryLastname || '');
  setValue('age', queryAge || null);
 }, [queryAge, queryFirstname, queryLastname, setValue]);

 return (
  <form>
   <h1 className='text-lg capitalize mb-4'>this my form</h1>
   <div className='grid gap-4'>
    <TextField
     label='firstname'
     {...register('firstname', {
      required: true,
     })}
    />
    <TextField label='lastname' {...register('lastname')} />
    <TextField label='age' type='number' {...register('age')} />
    <div className='flex gap-4 items-start'>
     <Controller
      control={control}
      name='gender'
      render={({ field: { onChange, ref, ...other } }) => (
       <Autocomplete
        className='flex-grow'
        {...other}
        onChange={(e, newValue) => onChange(newValue)}
        getOptionLabel={(op) => op.value}
        options={[
         { key: '1', value: 'male' },
         { key: '2', value: 'female' },
        ]}
        renderInput={(params) => (
         <TextField
          label='gender'
          {...params}
          error={!!errors.gender}
          helperText={errors.gender?.message || ''}
          inputRef={ref}
         />
        )}
       />
      )}
     />
     <Button variant='contained' size='large' onClick={changeGender}>
      change gender
     </Button>
    </div>
    <Button
     type='submit'
     variant='contained'
     size='large'
     onClick={handleSubmit(onSubmit, onError)}
    >
     submit
    </Button>
   </div>
  </form>
 );
}
