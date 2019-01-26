import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export default class CardActivity {
  // 主键
  @PrimaryGeneratedColumn()
  id: number
  // 活动图片
  @Column()
  img: string
  // 活动标题
  @Column()
  title: string
  // 该活动在首页的简介
  @Column()
  desc: string
  // 此活动是否显示在首页推荐
  @Column()
  recommended: boolean
  // 活动时间
  @Column()
  'time': string
  // 活动地区
  @Column()
  'area': string
  // 活动细则
  @Column()
  'full_msg': string
  // 更新日期
  @CreateDateColumn()
  createAt: Date
}
