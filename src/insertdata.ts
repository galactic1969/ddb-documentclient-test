import { DynamoDB } from 'aws-sdk';

import { People, Person } from './models';

const ddoc = new DynamoDB.DocumentClient({ region: process.env['AWS_REGION'] });
const tableName = process.env['DDB_TABLE_NAME'] as string;

const main = async () => {
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

  // put People class
  await ddoc
    .put({
      TableName: tableName,
      Item: {
        id: 'test1',
        data: people
      },
      ReturnValues: 'NONE'
    })
    .promise();

  // put array class
  await ddoc
    .put({
      TableName: tableName,
      Item: {
        id: 'test2',
        data: rawPeople
      },
      ReturnValues: 'NONE'
    })
    .promise();

  const result1 = await ddoc
    .get({
      TableName: tableName,
      Key: {
        id: 'test1'
      },
      ConsistentRead: true
    })
    .promise();

  const result2 = await ddoc
    .get({
      TableName: tableName,
      Key: {
        id: 'test2'
      },
      ConsistentRead: true
    })
    .promise();

  console.log(JSON.stringify(result1.Item, null, 2));
  console.log(JSON.stringify(result2.Item, null, 2));
};

main();
