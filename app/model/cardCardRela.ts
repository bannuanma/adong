import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// 信用卡之间的关联关系表
@Entity()
export default class CardCardRela {
  @PrimaryGeneratedColumn()
  id: number
  // 显示的卡id
  @Column()
  baseCardId: number
  // 推荐的卡id
  @Column()
  recomCardId: number
}
