class ExtendedArray<T> extends Array<T> {
  print(): void {
    console.log(this.join(', '));

    return;
  }

  toRawObject(): T[] {
    return this.map(item => item);
  }

  toRawObject2(): T[] {
    return new Array(...this);
  }

  toRawObject3(): T[] {
    return JSON.parse(JSON.stringify(this));
  }
}

export class Person {
  firstName = '';
  lastName = '';
  age = 0;

  constructor(init: Person) {
    Object.assign(this, init);
  }
}

export class People extends ExtendedArray<Person> {}
