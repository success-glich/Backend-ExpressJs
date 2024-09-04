import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

export interface IBlog {
    id?: number;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table
export class Blog extends Model<IBlog> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    title!: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
    })
    content!: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt!: Date;
}
