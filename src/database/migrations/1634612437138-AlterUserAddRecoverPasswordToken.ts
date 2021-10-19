import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddRecoverPasswordToken1634612437138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "Users",
            new TableColumn({ 
                name: "recoverPasswordToken",
                type: "varchar",
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("Users", "recoverPasswordToken");
    }

}
