class ExtendedArray<T> extends Array<T> {
  print(): void {
    return console.log(this.join(', '));
  }
  toJsonObject(): T[] {
    return this.map(item => item);
  }
}

export class Person {
  firstName = '';
  lastName = '';
  age: number = 0;

  constructor(init: Person) {
    Object.assign(this, init);
  }
}

export class People extends ExtendedArray<Person> {}
