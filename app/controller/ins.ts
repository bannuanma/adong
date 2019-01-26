import { Controller, Context } from 'egg'
/**
 * 保险页面controller
 * @class InsController
 * @extends {Controller}
 */
export default class InsController extends Controller {
  constructor(ctx: Context) {
    super(ctx)
    this.getRequestPayload = ctx.helper.getRequestPayload
    this.stdout = ctx.helper.stdout
    this.stderr = ctx.helper.stderr
  }
   /*
  保险
  */
  public async getFeeOfMonth() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        age: 'number',
        sex: 'string',
        insurType: 'string',
        basicAmount: 'number'
      }, payload)
      const data = await this.service.ins.getFeeOfMonth(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 获取首页推荐保险
  public async getRecommendIns() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        limits : 'string',
      }, payload)
      // 类型转换
      payload.limits = payload.limits as number
      const data = await this.service.ins.getRecommendIns(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 首页根据id返回保险详情
  public async getInsContent() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        id: 'string'
      }, payload)
      // 转换id为数字
      payload.id = payload.id as number
      const data = await this.service.ins.getInsContent(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 获取申请的用户（页面下方，只填写了手机号）
  public async applyUser() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        phone: 'string'
      }, payload)
      const data = await this.service.ins.applyUser(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

}
