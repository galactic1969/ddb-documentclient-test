import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

const ddb = new DynamoDB({ region: process.env['AWS_REGION'] });
const tableName = process.env['DDB_TABLE_NAME'] as string;

const main = async () => {
  try {
    const table = await ddb
      .describeTable({
        TableName: tableName
      })
      .promise();

    if (table.Table) {
      console.log('table already exists');
      console.log(table);
      return;
    }
  } catch (error) {
    const e = error as AWS.AWSError;
    console.log(e.statusCode);
    if (!e.message.includes('not found')) {
      throw error;
    }
  }

  console.log('creating...');
  const result = await ddb
    .createTable({
      TableName: tableName,
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      BillingMode: 'PROVISIONED',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ]
    })
    .promise();
  console.log(result);
};

main();
