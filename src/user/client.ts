// ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".
import { DynamoDB } from 'aws-sdk';
import { User } from './model';
export class UserClient {
  readonly client = new DynamoDB();
  public async putItem(item: User) {
    const attrs: DynamoDB.PutItemInputAttributeMap = {};
    attrs.username = { S: item.username };
    if (item.name != null) {
      attrs.name = { S: item.name };
    }
    if (item.lastname != null) {
      attrs.lastname = { S: item.lastname };
    }
    if (item.phone != null) {
      attrs.phone = { S: item.phone };
    }
    if (item.address != null) {
      attrs.address = { S: item.address };
    }
    const req: DynamoDB.PutItemInput = {
      TableName: process.env.USER_TABLE_NAME!,
      Item: attrs,
    };
    return this.client.putItem(req).promise();
  }
};