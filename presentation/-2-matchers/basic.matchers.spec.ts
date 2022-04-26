describe('describe', () => {
  it('test', () => {
    //Basic matchers for primitive values
    expect(1).toBe(1);
    expect(true).toBe(true);
    expect('string').toBe('string');
    expect(null).toBe(null);

    //Boolean matchers
    expect(true).toBeTruthy();
    expect(null).toBeFalsy();
    //to each matcher can be used (not)
    expect(1).not.toBeFalsy();

    //Object matcher
    expect({ a: 2 }).toEqual({ a: 2 });

  });

  it('strict equal', () => {
    const firstA = { a: 2 };
    const secondA = { a: 2 };

    const classA = new CheckStrict(2);

    expect(firstA).toStrictEqual(secondA);

    expect(firstA).not.toStrictEqual(classA);
    // toStrictEqual looks at object types and will Error
    expect(firstA).toStrictEqual(classA);
  });
});

class CheckStrict {
  public a: number;
  constructor(a: number) {
    this.a = a;
  }
}
