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
      console.log('removing...');
      const result = await ddb
        .deleteTable({
          TableName: tableName
        })
        .promise();
      console.log(result);
    }
  } catch (error) {
    const e = error as AWS.AWSError;
    console.log(e.statusCode);
    if (!e.message.includes('not found')) {
      throw error;
    }
    console.log('table is already removed');
  }
};

main();
