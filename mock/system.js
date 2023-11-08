
const VITE_API = '/api'

export const system = [
  {
    url: `${VITE_API}/system/role/page`,
    method: 'post',
    response: (config) => {
      return {
        msg: '操作成功',
        code: 200,
        data: {
          list: [
            {
              createTime: 1609912175000,
              updateTime: 1690300412000,
              creator: '',
              updater: '1',
              deleted: false,
              tenantId: 1,
              id: 101,
              name: '测试账号',
              code: 'test',
              sort: 0,
              status: 0,
              type: 2,
              remark: '132',
              dataScope: 1,
              dataScopeDeptIds: [

              ]
            },
            {
              createTime: 1609837428000,
              updateTime: 1645477700000,
              creator: 'admin',
              updater: '',
              deleted: false,
              tenantId: 1,
              id: 2,
              name: '普通角色',
              code: 'common',
              sort: 2,
              status: 1,
              type: 1,
              remark: '普通角色',
              dataScope: 2,
              dataScopeDeptIds: null
            },
            {
              createTime: 1609837428000,
              updateTime: 1645477701000,
              creator: 'admin',
              updater: '',
              deleted: false,
              tenantId: 1,
              id: 1,
              name: '超级管理员',
              code: 'super_admin',
              sort: 1,
              status: 0,
              type: 1,
              remark: '超级管理员',
              dataScope: 1,
              dataScopeDeptIds: null
            }
          ],
          total: 3
        },
        success: true
      }
    }
  },
  {
    url: `${VITE_API}/system/user/page`,
    method: 'post',
    response: (config) => {
      return {
        msg: '操作成功',
        code: 200,
        data: {
          list: [
            {
              username: 'goudan',
              nickname: '狗蛋',
              remark: null,
              deptId: 103,
              postIds: [
                1
              ],
              email: '',
              mobile: '',
              sex: 2,
              avatar: '',
              id: 118,
              status: 0,
              loginIp: '123.127.234.178',
              loginDate: 1698212977000,
              createTime: 1657359883000,
              dept: {
                id: 103,
                name: '研发部门'
              }
            },
            {
              username: 'admin123',
              nickname: '测试号',
              remark: '1111',
              deptId: 100,
              postIds: [
                2
              ],
              email: '',
              mobile: '15601691234',
              sex: 1,
              avatar: '',
              id: 117,
              status: 0,
              loginIp: '',
              loginDate: null,
              createTime: 1657359626000,
              dept: {
                id: 100,
                name: '芋道源码'
              }
            },
            {
              username: 'aotemane',
              nickname: '1',
              remark: '11',
              deptId: 101,
              postIds: [

              ],
              email: '',
              mobile: '',
              sex: 1,
              avatar: '',
              id: 115,
              status: 0,
              loginIp: '',
              loginDate: null,
              createTime: 1651258543000,
              dept: {
                id: 101,
                name: '深圳总公司'
              }
            },
            {
              username: 'hrmgr',
              nickname: 'hr 小姐姐',
              remark: null,
              deptId: null,
              postIds: [
                3
              ],
              email: '',
              mobile: '',
              sex: 0,
              avatar: '',
              id: 114,
              status: 0,
              loginIp: '123.113.154.15',
              loginDate: 1697677264000,
              createTime: 1647697858000,
              dept: null
            },
            {
              username: 'newobject',
              nickname: '新对象',
              remark: null,
              deptId: 100,
              postIds: [

              ],
              email: '',
              mobile: '',
              sex: 1,
              avatar: '',
              id: 112,
              status: 0,
              loginIp: '0:0:0:0:0:0:0:1',
              loginDate: 1676008093000,
              createTime: 1645614483000,
              dept: {
                id: 100,
                name: '芋道源码'
              }
            },
            {
              username: 'test',
              nickname: '测试号',
              remark: null,
              deptId: 107,
              postIds: [
                1,
                2
              ],
              email: '111@qq.com',
              mobile: '15601691200',
              sex: 1,
              avatar: '',
              id: 104,
              status: 0,
              loginIp: '122.224.93.74',
              loginDate: 1698633630000,
              createTime: 1611166433000,
              dept: {
                id: 107,
                name: '运维部门'
              }
            },
            {
              username: 'yuanma',
              nickname: '源码',
              remark: null,
              deptId: 106,
              postIds: null,
              email: 'yuanma@iocoder.cn',
              mobile: '15601701300',
              sex: 0,
              avatar: '',
              id: 103,
              status: 0,
              loginIp: '114.253.250.65',
              loginDate: 1694679928000,
              createTime: 1610553035000,
              dept: {
                id: 106,
                name: '财务部门'
              }
            },
            {
              username: 'yudao',
              nickname: '芋道',
              remark: '不要吓我',
              deptId: 104,
              postIds: [
                1
              ],
              email: 'yudao@iocoder.cn',
              mobile: '15601691300',
              sex: 1,
              avatar: '',
              id: 100,
              status: 1,
              loginIp: '127.0.0.1',
              loginDate: 1657379013000,
              createTime: 1609981637000,
              dept: {
                id: 104,
                name: '市场部门'
              }
            },
            {
              username: 'admin',
              nickname: '芋道源码',
              remark: '管理员',
              deptId: 103,
              postIds: [
                1
              ],
              email: 'aoteman@126.com',
              mobile: '15612345678',
              sex: 1,
              avatar: 'http://test.yudao.iocoder.cn/e1fdd7271685ec143a0900681606406621717a666ad0b2798b096df41422b32f.png',
              id: 1,
              status: 0,
              loginIp: '117.44.202.102',
              loginDate: 1699256237000,
              createTime: 1609837427000,
              dept: {
                id: 103,
                name: '研发部门'
              }
            }
          ],
          total: 9
        }
      }
    }
  },
  {
    url: `${VITE_API}/system/dict-data/list-all-simple`,
    method: 'get',
    response: (config) => {
      return {
        msg: '操作成功',
        code: 200,
        data: [
          {
            dictType: 'bpm_model_category',
            value: '1',
            label: '默认',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'bpm_model_category',
            value: '2',
            label: 'OA',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'bpm_model_form_type',
            value: '10',
            label: '流程表单',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'bpm_model_form_type',
            value: '20',
            label: '业务表单',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'bpm_oa_leave_type',
            value: '1',
            label: '病假',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'bpm_oa_leave_type',
            value: '2',
            label: '事假',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'bpm_oa_leave_type',
            value: '3',
            label: '婚假',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'bpm_process_instance_result',
            value: '1',
            label: '处理中',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'bpm_process_instance_result',
            value: '2',
            label: '通过',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'bpm_process_instance_result',
            value: '3',
            label: '不通过',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'bpm_process_instance_result',
            value: '4',
            label: '已取消',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'bpm_process_instance_status',
            value: '1',
            label: '进行中',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'bpm_process_instance_status',
            value: '2',
            label: '已完成',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_rule_type',
            value: '10',
            label: '角色',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_rule_type',
            value: '20',
            label: '部门的成员',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_rule_type',
            value: '21',
            label: '部门的负责人',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_rule_type',
            value: '22',
            label: '岗位',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_rule_type',
            value: '30',
            label: '用户',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_rule_type',
            value: '40',
            label: '用户组',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_rule_type',
            value: '50',
            label: '自定义脚本',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_script',
            value: '10',
            label: '流程发起人',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_script',
            value: '20',
            label: '流程发起人的一级领导',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'bpm_task_assign_script',
            value: '21',
            label: '流程发起人的二级领导',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bank_name',
            value: '0',
            label: '工商银行',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bank_name',
            value: '1',
            label: '建设银行',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bank_name',
            value: '2',
            label: '农业银行',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bank_name',
            value: '3',
            label: '中国银行',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bank_name',
            value: '4',
            label: '交通银行',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bank_name',
            value: '5',
            label: '招商银行',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bind_mode',
            value: '1',
            label: '首次绑定',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bind_mode',
            value: '2',
            label: '注册绑定',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_bind_mode',
            value: '3',
            label: '覆盖绑定',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_enabled_condition',
            value: '1',
            label: '人人分销',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_enabled_condition',
            value: '2',
            label: '指定分销',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_record_biz_type',
            value: '1',
            label: '订单返佣',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_record_biz_type',
            value: '2',
            label: '申请提现',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_record_biz_type',
            value: '3',
            label: '申请提现驳回',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_record_status',
            value: '0',
            label: '待结算',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_record_status',
            value: '1',
            label: '已结算',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_record_status',
            value: '2',
            label: '已取消',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_status',
            value: '0',
            label: '审核中',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_status',
            value: '10',
            label: '审核通过',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_status',
            value: '11',
            label: '提现成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_status',
            value: '20',
            label: '审核不通过',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_status',
            value: '21',
            label: '提现失败',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_type',
            value: '1',
            label: '钱包',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_type',
            value: '2',
            label: '银行卡',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_type',
            value: '3',
            label: '微信',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'brokerage_withdraw_type',
            value: '4',
            label: '支付宝',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'common_status',
            value: '0',
            label: '开启',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'common_status',
            value: '1',
            label: '关闭',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'infra_api_error_log_process_status',
            value: '0',
            label: '未处理',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'infra_api_error_log_process_status',
            value: '1',
            label: '已处理',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'infra_api_error_log_process_status',
            value: '2',
            label: '已忽略',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'infra_boolean_string',
            value: 'true',
            label: '是',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'infra_boolean_string',
            value: 'false',
            label: '否',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_front_type',
            value: '10',
            label: 'Vue2 Element UI 标准模版',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_front_type',
            value: '20',
            label: 'Vue3 Element Plus 标准模版',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_front_type',
            value: '21',
            label: 'Vue3 Element Plus Schema 模版',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_front_type',
            value: '30',
            label: 'Vue3 vben 模版',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_scene',
            value: '1',
            label: '管理后台',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_scene',
            value: '2',
            label: '用户 APP',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_template_type',
            value: '1',
            label: '单表（增删改查）',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_codegen_template_type',
            value: '2',
            label: '树表（增删改查）',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'infra_config_type',
            value: '1',
            label: '系统内置',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'infra_config_type',
            value: '2',
            label: '自定义',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'infra_file_storage',
            value: '1',
            label: '数据库',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'infra_file_storage',
            value: '10',
            label: '本地磁盘',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'infra_file_storage',
            value: '11',
            label: 'FTP 服务器',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'infra_file_storage',
            value: '12',
            label: 'SFTP 服务器',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'infra_file_storage',
            value: '20',
            label: 'S3 对象存储',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'infra_job_log_status',
            value: '0',
            label: '运行中',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'infra_job_log_status',
            value: '1',
            label: '成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'infra_job_log_status',
            value: '2',
            label: '失败',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'infra_job_status',
            value: '0',
            label: '初始化中',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'infra_job_status',
            value: '1',
            label: '正常',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'infra_job_status',
            value: '2',
            label: '暂停',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'member_experience_biz_type',
            value: '0',
            label: '管理员调整',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_experience_biz_type',
            value: '1',
            label: '邀新奖励',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_experience_biz_type',
            value: '4',
            label: '签到奖励',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_experience_biz_type',
            value: '5',
            label: '抽奖奖励',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_experience_biz_type',
            value: '11',
            label: '下单奖励',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'member_experience_biz_type',
            value: '12',
            label: '下单奖励（整单取消）',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'member_experience_biz_type',
            value: '13',
            label: '下单奖励（单个退款）',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '1',
            label: '签到',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '2',
            label: '管理员修改',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '11',
            label: '订单积分抵扣',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '12',
            label: '订单积分抵扣（整单取消）',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '13',
            label: '订单积分抵扣（单个退款）',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '21',
            label: '订单积分奖励',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '22',
            label: '订单积分奖励（整单取消）',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'member_point_biz_type',
            value: '23',
            label: '订单积分奖励（单个退款）',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_auto_reply_request_match',
            value: '1',
            label: '完全匹配',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'mp_auto_reply_request_match',
            value: '2',
            label: '半匹配',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'text',
            label: '文本',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'image',
            label: '图片',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'voice',
            label: '语音',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'video',
            label: '视频',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'shortvideo',
            label: '小视频',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'news',
            label: '图文',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'music',
            label: '音乐',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'location',
            label: '地理位置',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'link',
            label: '链接',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'mp_message_type',
            value: 'event',
            label: '事件',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'wx_pub',
            label: '微信公众号支付',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'wx_lite',
            label: '微信小程序支付',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'wx_app',
            label: '微信 App 支付',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'wx_native',
            label: '微信扫码支付',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'wx_bar',
            label: '微信条码支付',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'alipay_pc',
            label: '支付宝 PC 网站支付',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'alipay_wap',
            label: '支付宝 Wap 网站支付',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'alipay_app',
            label: '支付宝 App 支付',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'alipay_bar',
            label: '支付宝条码支付',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'alipay_qr',
            label: '支付宝扫码支付',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'mock',
            label: '模拟支付',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'pay_channel_code',
            value: 'wallet',
            label: '钱包',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'pay_notify_status',
            value: '0',
            label: '等待通知',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'pay_notify_status',
            value: '10',
            label: '通知成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_notify_status',
            value: '20',
            label: '通知失败',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'pay_notify_status',
            value: '21',
            label: '请求成功，但是结果失败',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'pay_notify_status',
            value: '22',
            label: '请求失败',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'pay_notify_type',
            value: '1',
            label: '支付单',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'pay_notify_type',
            value: '2',
            label: '退款单',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'pay_order_status',
            value: '0',
            label: '等待支付',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'pay_order_status',
            value: '10',
            label: '支付成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_order_status',
            value: '20',
            label: '已退款',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'pay_order_status',
            value: '30',
            label: '支付关闭',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'pay_refund_status',
            value: '0',
            label: '等待退款',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'pay_refund_status',
            value: '10',
            label: '退款成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'pay_refund_status',
            value: '20',
            label: '退款失败',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'product_spu_status',
            value: '0',
            label: '仓库中',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'product_spu_status',
            value: '-1',
            label: '回收站',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'product_spu_status',
            value: '1',
            label: '销售中',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '1',
            label: '个',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '2',
            label: '件',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '3',
            label: '盒',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '4',
            label: '袋',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '5',
            label: '箱',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '6',
            label: '套',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '7',
            label: '包',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '8',
            label: '双',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'product_unit',
            value: '9',
            label: '卷',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'promotion_activity_status',
            value: '10',
            label: '未开始',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'promotion_activity_status',
            value: '20',
            label: '进行中',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'promotion_activity_status',
            value: '30',
            label: '已结束',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'promotion_activity_status',
            value: '40',
            label: '已关闭',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_banner_position',
            value: '5',
            label: '满减送页',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_banner_position',
            value: '4',
            label: '限时折扣页',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_banner_position',
            value: '3',
            label: '砍价活动页',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_banner_position',
            value: '2',
            label: '秒杀活动页',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_banner_position',
            value: '1',
            label: '首页',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_bargain_record_status',
            value: '1',
            label: '砍价中',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'promotion_bargain_record_status',
            value: '2',
            label: '砍价成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'promotion_bargain_record_status',
            value: '3',
            label: '砍价失败',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_combination_record_status',
            value: '1',
            label: '拼团中',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'promotion_combination_record_status',
            value: '2',
            label: '拼团成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'promotion_combination_record_status',
            value: '3',
            label: '拼团失败',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'promotion_condition_type',
            value: '10',
            label: '满 N 元',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'promotion_condition_type',
            value: '20',
            label: '满 N 件',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'promotion_coupon_status',
            value: '1',
            label: '未使用',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'promotion_coupon_status',
            value: '2',
            label: '已使用',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'promotion_coupon_status',
            value: '3',
            label: '已过期',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'promotion_coupon_take_type',
            value: '1',
            label: '直接领取',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'promotion_coupon_take_type',
            value: '2',
            label: '指定发放',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'promotion_coupon_template_validity_type',
            value: '1',
            label: '固定日期',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'promotion_coupon_template_validity_type',
            value: '2',
            label: '领取之后',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'promotion_discount_type',
            value: '1',
            label: '满减',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'promotion_discount_type',
            value: '2',
            label: '折扣',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'promotion_product_scope',
            value: '1',
            label: '通用劵',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'promotion_product_scope',
            value: '2',
            label: '商品劵',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'promotion_product_scope',
            value: '3',
            label: '品类劵',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'system_data_scope',
            value: '1',
            label: '全部数据权限',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_data_scope',
            value: '2',
            label: '指定部门数据权限',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_data_scope',
            value: '3',
            label: '本部门数据权限',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_data_scope',
            value: '4',
            label: '本部门及以下数据权限',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_data_scope',
            value: '5',
            label: '仅本人数据权限',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_error_code_type',
            value: '1',
            label: '自动生成',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'system_error_code_type',
            value: '2',
            label: '手动编辑',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_login_result',
            value: '0',
            label: '成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'system_login_result',
            value: '10',
            label: '账号或密码不正确',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_login_result',
            value: '20',
            label: '用户被禁用',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'system_login_result',
            value: '30',
            label: '验证码不存在',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_login_result',
            value: '31',
            label: '验证码不正确',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_login_result',
            value: '100',
            label: '未知异常',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_login_type',
            value: '100',
            label: '账号登录',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_login_type',
            value: '101',
            label: '社交登录',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_login_type',
            value: '103',
            label: '短信登录',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'system_login_type',
            value: '200',
            label: '主动登出',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_login_type',
            value: '202',
            label: '强制登出',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_mail_send_status',
            value: '0',
            label: '初始化',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_mail_send_status',
            value: '10',
            label: '发送成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'system_mail_send_status',
            value: '20',
            label: '发送失败',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_mail_send_status',
            value: '30',
            label: '不发送',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_menu_type',
            value: '1',
            label: '目录',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_menu_type',
            value: '2',
            label: '菜单',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_menu_type',
            value: '3',
            label: '按钮',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'system_notice_type',
            value: '1',
            label: '通知',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'system_notice_type',
            value: '2',
            label: '公告',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_notify_template_type',
            value: '1',
            label: '通知公告',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_notify_template_type',
            value: '2',
            label: '系统消息',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'system_oauth2_grant_type',
            value: 'password',
            label: 'password',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'system_oauth2_grant_type',
            value: 'authorization_code',
            label: 'authorization_code',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_oauth2_grant_type',
            value: 'implicit',
            label: 'implicit',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'system_oauth2_grant_type',
            value: 'client_credentials',
            label: 'client_credentials',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'system_oauth2_grant_type',
            value: 'refresh_token',
            label: 'refresh_token',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_operate_type',
            value: '0',
            label: '其它',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'system_operate_type',
            value: '1',
            label: '查询',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_operate_type',
            value: '2',
            label: '新增',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_operate_type',
            value: '3',
            label: '修改',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'system_operate_type',
            value: '4',
            label: '删除',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_operate_type',
            value: '5',
            label: '导出',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'system_operate_type',
            value: '6',
            label: '导入',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'system_role_type',
            value: '1',
            label: '内置',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_role_type',
            value: '2',
            label: '自定义',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_sms_channel_code',
            value: 'DEBUG_DING_TALK',
            label: '调试(钉钉)',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_sms_channel_code',
            value: 'ALIYUN',
            label: '阿里云',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_sms_receive_status',
            value: '0',
            label: '等待结果',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_sms_receive_status',
            value: '10',
            label: '接收成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'system_sms_receive_status',
            value: '20',
            label: '接收失败',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_sms_send_status',
            value: '0',
            label: '初始化',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_sms_send_status',
            value: '10',
            label: '发送成功',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'system_sms_send_status',
            value: '20',
            label: '发送失败',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_sms_send_status',
            value: '30',
            label: '不发送',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'system_sms_template_type',
            value: '3',
            label: '营销',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'system_sms_template_type',
            value: '1',
            label: '验证码',
            colorType: 'warning',
            cssClass: ''
          },
          {
            dictType: 'system_sms_template_type',
            value: '2',
            label: '通知',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'system_user_sex',
            value: '1',
            label: '男',
            colorType: 'default',
            cssClass: 'A'
          },
          {
            dictType: 'terminal',
            value: '10',
            label: '微信小程序',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'terminal',
            value: '11',
            label: '微信公众号',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'terminal',
            value: '20',
            label: 'H5 网页',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'terminal',
            value: '31',
            label: '苹果 App',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'terminal',
            value: '32',
            label: '安卓 App',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '10',
            label: '申请售后',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '20',
            label: '商品待退货',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '30',
            label: '商家待收货',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '40',
            label: '等待退款',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '50',
            label: '退款成功',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '61',
            label: '买家取消',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '62',
            label: '商家拒绝',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_status',
            value: '63',
            label: '商家拒收货',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_type',
            value: '10',
            label: '售中退款',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_type',
            value: '20',
            label: '售后退款',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_way',
            value: '10',
            label: '仅退款',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_after_sale_way',
            value: '20',
            label: '退货退款',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'trade_delivery_express_charge_mode',
            value: '1',
            label: '按件',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'trade_delivery_express_charge_mode',
            value: '2',
            label: '按重量',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'trade_delivery_express_charge_mode',
            value: '3',
            label: '按体积',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'trade_delivery_type',
            value: '1',
            label: '快递发货',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'trade_delivery_type',
            value: '2',
            label: '用户自提',
            colorType: '',
            cssClass: ''
          },
          {
            dictType: 'trade_order_item_after_sale_status',
            value: '0',
            label: '未售后',
            colorType: 'info',
            cssClass: ''
          },
          {
            dictType: 'trade_order_item_after_sale_status',
            value: '1',
            label: '售后中',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_order_item_after_sale_status',
            value: '2',
            label: '已退款',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'trade_order_status',
            value: '0',
            label: '待支付',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'trade_order_status',
            value: '10',
            label: '待发货',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_order_status',
            value: '20',
            label: '已发货',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'trade_order_status',
            value: '30',
            label: '已完成',
            colorType: 'success',
            cssClass: ''
          },
          {
            dictType: 'trade_order_status',
            value: '40',
            label: '已取消',
            colorType: 'danger',
            cssClass: ''
          },
          {
            dictType: 'trade_order_type',
            value: '0',
            label: '普通订单',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'trade_order_type',
            value: '1',
            label: '秒杀订单',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'trade_order_type',
            value: '2',
            label: '拼团订单',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'trade_order_type',
            value: '3',
            label: '砍价订单',
            colorType: 'default',
            cssClass: ''
          },
          {
            dictType: 'user_type',
            value: '1',
            label: '会员',
            colorType: 'primary',
            cssClass: ''
          },
          {
            dictType: 'user_type',
            value: '2',
            label: '管理员',
            colorType: 'success',
            cssClass: ''
          }
        ]
      }
    }
  },
  {
    url: `${VITE_API}/system/dept/list-all-simple`,
    method: 'get',
    response: (config) => {
      return {
        msg: '操作成功',
        code: 200,
        data: [
          {
            id: 100,
            name: '芋道源码',
            children: [
              {
                id: 101,
                name: '深圳总公司',
                children: [
                  {
                    id: 103,
                    name: '研发部门'
                  },
                  {
                    id: 104,
                    name: '市场部门'
                  },
                  {
                    id: 105,
                    name: '测试部门'
                  },
                  {
                    id: 106,
                    name: '财务部门'
                  },
                  {
                    id: 107,
                    name: '运维部门'
                  }
                ]
              },

              {
                id: 102,
                name: '长沙分公司',
                children: [
                  {
                    id: 108,
                    name: '市场部门'
                  },
                  {
                    id: 109,
                    name: '财务部门'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    url: `${VITE_API}/system/permission/assign-role-data-scope`,
    method: 'post',
    response: (config) => {
      return {
        msg: '操作成功',
        code: 200,
        data: true
      }
    }
  },
  {
    url: `${VITE_API}/system/dict-type/page`,
    method: 'post',
    response: (config) => {
      return {
        msg: '操作成功',
        code: 200,
        data: {
          list: [
            {
              name: 'Banner Position',
              status: 0,
              remark: '',
              id: 600,
              type: 'promotion_banner_position',
              createTime: 1696721065000
            },
            {
              name: '拼团记录的状态',
              status: 0,
              remark: '',
              id: 184,
              type: 'promotion_combination_record_status',
              createTime: 1696721065000
            },
            {
              name: '砍价记录的状态',
              status: 0,
              remark: '',
              id: 183,
              type: 'promotion_bargain_record_status',
              createTime: 1696473668000
            },
            {
              name: '佣金提现银行',
              status: 0,
              remark: null,
              id: 182,
              type: 'brokerage_bank_name',
              createTime: 1695840365000
            },
            {
              name: '佣金提现状态',
              status: 0,
              remark: null,
              id: 181,
              type: 'brokerage_withdraw_status',
              createTime: 1695840365000
            },
            {
              name: '佣金记录状态',
              status: 0,
              remark: null,
              id: 180,
              type: 'brokerage_record_status',
              createTime: 1695840365000
            },
            {
              name: '佣金记录业务类型',
              status: 0,
              remark: null,
              id: 179,
              type: 'brokerage_record_biz_type',
              createTime: 1695840365000
            },
            {
              name: '佣金提现类型',
              status: 0,
              remark: null,
              id: 178,
              type: 'brokerage_withdraw_type',
              createTime: 1695840365000
            },
            {
              name: '分销关系绑定模式',
              status: 0,
              remark: null,
              id: 177,
              type: 'brokerage_bind_mode',
              createTime: 1695840365000
            },
            {
              name: '分佣模式',
              status: 0,
              remark: null,
              id: 176,
              type: 'brokerage_enabled_condition',
              createTime: 1695840365000
            }
          ],
          total: 69
        }
      }
    }
  }
]
