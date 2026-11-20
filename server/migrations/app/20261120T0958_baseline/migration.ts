#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a54d34d81005b6a1c0fbf0b40d1b349f7497e2f9b9f8f144bf392979a891c1c8/contract';
import endContract from '../../snapshots/a54d34d81005b6a1c0fbf0b40d1b349f7497e2f9b9f8f144bf392979a891c1c8/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  createCollection,
  createIndex,
} from '@prisma/orm-mongo/target/migration';

class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      createCollection('users', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              email: { bsonType: 'string' },
              name: { bsonType: ['null', 'string'] },
            },
            required: ['_id', 'email'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createIndex('users', [{ direction: 1, field: 'email' }], { name: 'email_1', unique: true }),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
