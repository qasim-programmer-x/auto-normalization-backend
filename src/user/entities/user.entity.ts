import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column
  name: string;

  @Column
  password: string;
}
