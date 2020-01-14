import { DynamoDB } from 'aws-sdk';

import { People, Person } from './models';

const ddoc = new DynamoDB.DocumentClient({ region: process.env['AWS_REGION'] });
const tableName = process.env['DDB_TABLE_NAME'] as string;

interface Testcase {
  message: string;
  data: any;
}

const putAndView = async (testcase: Testcase): Promise<void> => {
  await ddoc
    .put({
      TableName: tableName,
      Item: {
        id: testcase.message,
        data: testcase.data
      },
      ReturnValues: 'NONE'
    })
    .promise();

  const result = await ddoc
    .get({
      TableName: tableName,
      Key: {
        id: testcase.message
      },
      ConsistentRead: true
    })
    .promise();

  console.log(JSON.stringify(result.Item, null, 2));
};

const main = async (): Promise<void> => {
  const people = new People(
    new Person({ age: 5, firstName: 'momotaro', lastName: 'yamada' }),
    new Person({ age: 6, firstName: 'takashi', lastName: 'suzuki' }),
    new Person({ age: 7, firstName: 'koichi', lastName: 'sato' })
  );
  const rawPeople = [
    new Person({ age: 5, firstName: 'momotaro', lastName: 'yamada' }),
    new Person({ age: 6, firstName: 'takashi', lastName: 'suzuki' }),
    new Person({ age: 7, firstName: 'koichi', lastName: 'sato' })
  ];

  const testdata: Testcase[] = [
    {
      message: 'extended array',
      data: people
    },
    {
      message: 'raw array',
      data: rawPeople
    },
    {
      message: 'converted to raw array from extended array using Array.map()',
      data: people.toRawObject()
    }
  ];

  for (const td of testdata) {
    console.log(`Array.isArray(): ${Array.isArray(td.data)}`);
    await putAndView(td);
  }
};

main();
