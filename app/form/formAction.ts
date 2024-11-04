'use server';

interface Fields {
 firstname: string;
 lastname: string;
 age: number | null;
}

function getValue<T extends ReadonlyArray<keyof Fields>>(
 items: T
): ReadonlyArray<Fields[T[number]]> {
 return [];
}

const params = ['firstname', 'age'] as const;

const [firstname, age] = getValue(params);

export async function formAction() {
 console.log('calling a function on server');
}
