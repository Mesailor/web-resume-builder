#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/a54d34d81005b6a1c0fbf0b40d1b349f7497e2f9b9f8f144bf392979a891c1c8/contract';
import startContract from '../../snapshots/a54d34d81005b6a1c0fbf0b40d1b349f7497e2f9b9f8f144bf392979a891c1c8/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a7d00abb0f8fc9c9f5ace78b306278673e60cc5774ec1833cd0cfd334beead54/contract';
import endContract from '../../snapshots/a7d00abb0f8fc9c9f5ace78b306278673e60cc5774ec1833cd0cfd334beead54/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, collMod } from '@prisma/orm-mongo/target/migration';

class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      collMod(
        'users',
        {
          validator: {
            $jsonSchema: {
              additionalProperties: false,
              bsonType: 'object',
              properties: {
                _id: { bsonType: 'objectId' },
                email: { bsonType: 'string' },
                name: { bsonType: ['null', 'string'] },
                phone: { bsonType: ['null', 'string'] },
              },
              required: ['_id', 'email'],
            },
          },
          validationLevel: 'strict',
          validationAction: 'error',
        },
        {
          id: 'validator.users.update',
          label: 'Update validator on users (added: phone)',
          operationClass: 'widening',
          checkDocuments: true,
        },
      ),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
