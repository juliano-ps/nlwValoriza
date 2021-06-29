import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Expose } from "class-transformer";

@Entity("Tags")
class Tag {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({name: "nameCustom"})
  namecustom(): string { 
    return `#${this.name}`;
  }

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Tag };