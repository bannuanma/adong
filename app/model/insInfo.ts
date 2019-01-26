import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export default class InsInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  desc: string

  @Column()
  info: string

  @Column({default: false})
  recommend: boolean

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
