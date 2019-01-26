import { Service, Context } from 'egg'
import { CardInfoModel, CardActivityModel, CardUserModel, CardCardRelaModel, CardActRelaModel } from '../model'
import CardUser from '../model'
import CardInfo from '../model'
import CardActivity from '../model'

export default class CreditCard extends Service {
  constructor(ctx: Context) {
    super(ctx)
  }

  /**
   * 获取信用卡首页的推荐信息（信用卡和优惠活动）
   * @param act_num 推荐活动的显示数目
   * @param card_num 推荐信用卡的显示数目
   * @returns [信用卡数组, 优惠活动数组]
   */
  public async getRecActAndCard( {act_num, card_num }: {act_num: number, card_num: number} ): Promise<[CardActivity[], CardInfo[]]> {
    const { app } = this
    const actRepository  = app.typeorm.getRepository(CardActivityModel)
    const cardRepository  = app.typeorm.getRepository(CardInfoModel)
    // 活动数组
    const acts = await actRepository.find(
      {
        where: {
          recommended: true
        },
        take: act_num
      }
    )
    // 信用卡数组
    const cards = await cardRepository.find(
      {
        where: {
          recommended: true
        },
        take: card_num
      }
    )
    return [acts, cards]
  }

  /**
   * 快速推荐信用卡
   * @param minMonthIncome 用户最小月收入
   * @param maxMonthIncom 用户最大月收入
   * @param amount 申请额度
   * @param phone 联系方式
   * @returns 匹配的单张卡详情
   */
  public async fastMatch( {minMonthIncome, maxMonthIncome, amount, phone}: {minMonthIncome: number, maxMonthIncome: number,
    amount: number, phone: string} ): Promise<CardInfo | undefined> {
    const { app } = this
    const cardRepository  = app.typeorm.getRepository(CardInfoModel)
    // 这里先模拟一个返回
    if ((minMonthIncome > 0) && (maxMonthIncome < 100000) && (amount > 0) && (phone.length === 11)) {
      const card = await cardRepository.findOne({
        // 只需要返回以下字段
        select: ['id', 'name', 'img', 'bank', 'base_info', 'pri_info', 'fee_info', 'condi_info']
      })
      return card
    }else {
      throw new Error('无法找到适合您的信用卡~')
    }
  }

  /**
   * 用户申请信用卡
   * @param card_id 申请的信用卡id
   * @param name 用户姓名
   * @param sex 用户性别
   * @param id_number 身份证号
   * @param phone 电话号
   * @param income_min 月收入最小值
   * @param income_max 月收入最大值
   * @param amount 额度
   * @param address 地址
   * @returns 插入的记录
   */
  public async apply( {card_id, name, sex, id_number, phone, income_min, income_max, amount, address}: {
    card_id: number, name: string, sex: string, id_number: string, phone: string, income_min: number,
    income_max: number, amount: number, address: string}): Promise<CardUser> {
    const { app } = this
    const userRepository  = app.typeorm.getRepository(CardUserModel)
    const user = new CardUser()
    user.card_id = card_id
    user.name = name
    user.sex = sex
    user.id_number = id_number
    user.phone = phone
    user.income_min = income_min
    user.income_max = income_max
    user.amount = amount
    user.address = address
    // 保存用户
    const status = await userRepository.save(user)
    return status
    }
  /**
   * 首页进入活动详情页
   * @id 活动id
   * @returns {Promise<object>} 活动详情和参与活动的n个信用卡
   */
  public async activity({ id }: {id: number}): Promise<object> {
    const { app } = this
    // 查询对应活动的详情
    const actRepository  = app.typeorm.getRepository(CardActivityModel)
    const cardRepository = app.typeorm.getRepository(CardInfoModel)
    const cardActRelRepository = app.typeorm.getRepository(CardActRelaModel)
    const act = await actRepository.findOne({
      where: {
        id
      },
      // 只需要返回以下字段
      select: ['id', 'title', 'desc', 'time', 'area', 'full_msg']
    })
    // 查询参与该活动的卡id
    const rel_ids = await cardActRelRepository.find({
      act_id : id
    })
    // 返回的关联卡的数组
    const result_rel_cards = new Array()
    for (const element of rel_ids) {
      const rel_card = await cardRepository.findOne({
        // 查找对应id的关联卡的id和图片
        where: {
          id: element.card_id
        },
        select: ['id', 'img']
      })
      // 添加至结果数组
      result_rel_cards.push(rel_card)
    }
    return {act, result_rel_cards}
  }

  /**
   * 首页根据信用卡id进入信用卡详情页
   * @param id 信用卡id
   * @returns 对应的信用卡详情+对应的推荐信用卡
   */
  public async cardInfo( { id }: {id: number}): Promise<object> {
    const { app } = this
    // 查询对应卡的详情
    const cardRepository  = app.typeorm.getRepository(CardInfoModel)
    const relCardRepository = app.typeorm.getRepository(CardCardRelaModel)
    const card = await cardRepository.findOne({
      where: {
        id
      },
      // 只需要返回以下字段
      select: ['id', 'name', 'img', 'bank', 'base_info', 'pri_info', 'fee_info', 'condi_info']
    })
    // 查询关联卡id
    const rel_ids = await relCardRepository.find({
      base_card_id: id
    })
    // 返回的关联卡的数组
    const result_rel_cards = new Array()
    for (const element of rel_ids) {
      const rel_card = await cardRepository.findOne({
        // 查找对应id的关联卡的id和图片
        where: {
          id: element.recom_card_id
        },
        select: ['id', 'img']
      })
      // 添加至结果数组
      result_rel_cards.push(rel_card)
    }
    return {card, result_rel_cards}
  }
}
