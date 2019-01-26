import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export default class CardInfo {
  // 主键
  @PrimaryGeneratedColumn()
  id: number
  // 信用卡名称
  @Column()
  name: string
  // 信用卡图片
  @Column()
  img: string
  // 信用卡所属银行
  @Column()
  bank: string
  // 首页推荐卡的简介
  @Column()
  desc: string
  // 此卡是否显示在首页推荐
  @Column()
  recommended: boolean
  // 基本信息
  @Column()
  baseInfo: string
  // 专享特权
  @Column()
  priInfo: string
  // 相关费用
  @Column()
  feeInfo: string
   // 申请条件
  @Column()
  condiInfo: string
  // 更新日期
  @CreateDateColumn()
  createIt: Date
}
