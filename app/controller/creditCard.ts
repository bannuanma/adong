import { Controller, Context } from 'egg'
/**
 * 信用卡页面controller
 * @class CreditCardController
 * @extends {Controller}
 */
export default class CreditCardController extends Controller {
  constructor(ctx: Context) {
    super(ctx)
    this.getRequestPayload = ctx.helper.getRequestPayload
    this.stdout = ctx.helper.stdout
    this.stderr = ctx.helper.stderr
  }
  // 获取信用卡主页推荐活动和信用卡
  public async getRecActAndCard() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        act_num: 'string',
        card_num: 'string'
      }, payload)
      // 转换为数字
      payload.act_num = payload.act_num as number
      payload.card_num = payload.card_num as number
      const data = await this.service.creditCard.getRecActAndCard(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 快速匹配合适的信用卡
  public async fastMatch() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        minMonthIncome: 'number',
        maxMonthIncome: 'number',
        amount: 'number',
        phone: 'string'
      }, payload)
      const data = await this.service.creditCard.fastMatch(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 申请信用卡
  public async apply() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        card_id: 'number',
        name: 'string',
        sex: 'string',
        id_number: 'string',
        phone: 'string',
        income_min: 'number',
        income_max: 'number',
        amount: 'number',
        address: 'string'
      }, payload)
      const data = await this.service.creditCard.apply(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 活动详情
  public async activity() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
       id: 'string'
      }, payload)
      // 类型转换
      payload.id = payload.id as number
      const data = await this.service.creditCard.activity(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 信用卡详情
  public async cardInfo() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
       id: 'string'
      }, payload)
      // 类型转换
      payload.id = payload.id as number
      const data = await this.service.creditCard.cardInfo(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }
}
