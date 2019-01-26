import { Service, Context } from 'egg'
import { InsUserModel, InsInfoModel } from '../model'
import InsUser from '../model'
import InsInfo from '../model'

export default class Ins extends Service {
  constructor(ctx: Context) {
    super(ctx)
  }

  /**
   * 保险试算：计算每月应缴纳的大概保费
   * @param age:年龄
   * @param sex:性别
   * @param insurType:险种
   * @param basicAmount:基础保额
   * @returns 每月应交保费
   */
  public async getFeeOfMonth( {age, sex, insurType, basicAmount}: {age: number, sex: string, insurType: string,
                              basicAmount: number}): Promise<number> {
    // 具体如何计算暂不清楚，先写个接口
    if (insurType === '寿险' && sex === '男') {
      return age * basicAmount
    }
    return 5000
  }

  /**
   * 获取首页推荐的保险
   * @limits: 一次返回的保险数目
   * @returns 保险数组
   */
  public async getRecommendIns({ limits }: {limits: number}): Promise<InsInfo[]> {
    const { app } = this
    const insRepository  = app.typeorm.getRepository(InsInfoModel)
    const ins = await insRepository.find({
      where: {
        recommend: true
      },
      take : limits
    })
    return ins
  }

  /**
   * 首页根据id返回保险详情内容
   * @param id:要查询的保险id
   * @returns:对应的保险对象内容
   */
  public async getInsContent({ id }: {id: number}): Promise<InsInfo> {
    const { app } = this
    const insRepository = app.typeorm.getRepository(InsInfoModel)
    const ins = await insRepository.findOne({
      id
    })
    // 找不到对应的id的保险
    if (!ins) {
      throw new Error('无法找到对应的保险信息~')
    }
    return ins
  }

  /**
   * 添加电话号
   * @param phone: 用户所填电话号
   * @returns :添加成功的对象
   */
  public async applyUser({ phone }: {phone: string}): Promise<InsUser> {
    const { app } = this
    const userRepository = app.typeorm.getRepository(InsUserModel)
    // 根据电话号创建匿名User
    const user = new InsUser()
    user.phone = phone

    const status = await userRepository.save(user) // 如果存在，更新；不存在，增加。
    return status
  }

}
