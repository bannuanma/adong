import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export default class Greeting {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  greeting: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
