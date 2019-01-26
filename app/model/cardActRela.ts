import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// 信用卡与活动之间的关联关系表
@Entity()
export default class CardActRela {
  @PrimaryGeneratedColumn()
  id: number
  // 卡id
  @Column()
  cardId: number
  // 活动id
  @Column()
  actId: number
}
