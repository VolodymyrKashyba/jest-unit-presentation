export type myType = {
  name: string;
  age: number;
  email: string;
  isValid: boolean;
};

export async function someComplicatedFunction(data: myType): Promise<myType> {
  return { name: data.name + 'my name is...', age: data.age * 2, ...data };
}
