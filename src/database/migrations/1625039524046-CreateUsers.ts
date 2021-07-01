import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1625039524046 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "firstname",
                        type: "varchar"
                    },
                    {
                        name: "lastname",
                        type: "varchar"
                    },
                    {
                    name: "email",
                    type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
