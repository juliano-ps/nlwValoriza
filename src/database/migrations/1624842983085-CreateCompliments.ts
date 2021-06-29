import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1624842983085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({ 
                name: "Compliments",
                columns: [
                    { 
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "userSender",
                        type: "uuid"
                    },
                    {
                        name: "userReceiver",
                        type: "uuid"
                    },
                    {
                        name: "tagId",
                        type: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "Users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userSender"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserReceiverCompliments",
                        referencedTableName: "Users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userReceiver"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKTagComplimentsCompliments",
                        referencedTableName: "Tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tagId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Compliments");
    }

}
