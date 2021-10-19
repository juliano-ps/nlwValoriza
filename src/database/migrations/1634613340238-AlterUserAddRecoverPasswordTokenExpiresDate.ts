import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddRecoverPasswordTokenExpiresDate1634613340238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "Users",
            new TableColumn({ 
                name: "recoverPasswordTokenExpiresDate",
                type: "timestamp",
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("Users", "recoverPasswordTokenExpiresDate");
    }
}
