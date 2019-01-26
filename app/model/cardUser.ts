import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm'

@Entity()
export default class CardUser {
  // 主键
  @PrimaryGeneratedColumn()
  id: number
  // 姓名
  @Column()
  name: string
  // 性别
  @Column()
  sex: string
  // 身份证号
  @Column()
  idNumber: string
  // 电话号
  @Column()
  phone: string
  // 最小月收入
  @Column()
  incomeMin: number
  // 最大月收入
  @Column()
  incomeMax: number
  // 申请额度
  @Column()
  amount: number
  // 邮寄地址
  address: string
  // 申请的信用卡的id
  cardId: number

  @CreateDateColumn()
  createAt: Date
}
