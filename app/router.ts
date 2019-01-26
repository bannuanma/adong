import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  // 判断系统是否存活的接口
  router.get('/alive', controller.home.alive)

  // home
  router.get('/home/greet', controller.home.greet)
  router.get('/home/isAdmin', controller.home.isAdmin)

  /*
  保险
  */
  // 保险试算
  router.post('/ins/getFeeOfMonth', controller.ins.getFeeOfMonth)

  // 获取首页推荐保险
  router.get('/ins/:limits', controller.ins.getRecommendIns)

  // 首页根据id获取保险详情
  router.get('/ins/content/:id', controller.ins.getInsContent)

  // 添加申请用户（只填写手机号的那些）
  router.post('/ins/applyUser', controller.ins.applyUser)

  /*
  信用卡
  */
  // 获取信用卡首页推荐的活动和信用卡
  router.get('/creditCard', controller.creditCard.getRecActAndCard)

  // 快速匹配信用卡
  router.post('/creditCard/fastMatch', controller.creditCard.fastMatch)

  // 添加用户
  router.post('/creditCard/apply', controller.creditCard.apply)

  // 首页进入活动详情
  router.get('/creditCard/activity/:id', controller.creditCard.activity)

  // 首页进入信用卡详情
  router.get('/creditCard/cardInfo/:id', controller.creditCard.cardInfo)
}
