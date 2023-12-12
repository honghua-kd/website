import authData from './data/authData'

// const VITE_APP_SERVER_SER = '/api/portalBackend'
const VITE_API = '/api/operations-management'
export const login = [
  {
    url: `${VITE_API}/user/v1/getPermission`,
    type: 'get',
    response() {
      return {
        code: 102200000,
        msg: '操作成功',
        success: true,
        data: {
          role: [
            {
              roleNo: 'admin',
              roleName: '超级管理员'
            }
          ],
          data: authData
        },
        time: '2023-11-22 13:16:50'
      }
    }
  },
  {
    url: `${VITE_API}/user/v1/getInfo`,
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          staffCode: '103388',
          staffName: '郑拓',
          gender: '',
          workplace: '恒信',
          staffType: null,
          deptmentId: '545',
          deptmentName: '金融科技部',
          deptmentSecId: '664',
          deptmentSecName: '系统研发二部',
          deptmentThrId: '',
          deptmentThrName: '',
          positionId: '2899',
          positionName: '前端开发岗',
          stat: '在职',
          email: 'hthxoa@devutflc.com',
          phoneNumber: '18611111111',
          pwdUpdateTime: null,
          password: null
        }
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/system/dict-type/list-all-simple`,
    type: 'get',
    response() {
      return {
        code: 200,
        data: [
          {
            id: 1,
            name: '用户性别',
            type: 'system_user_sex'
          },
          {
            id: 6,
            name: '参数类型',
            type: 'infra_config_type'
          },
          {
            id: 7,
            name: '通知类型',
            type: 'system_notice_type'
          },
          {
            id: 9,
            name: '操作类型',
            type: 'system_operate_type'
          },
          {
            id: 10,
            name: '系统状态',
            type: 'common_status'
          },
          {
            id: 11,
            name: 'Boolean 是否类型',
            type: 'infra_boolean_string'
          },
          {
            id: 104,
            name: '登陆结果',
            type: 'system_login_result'
          },
          {
            id: 105,
            name: 'Redis 超时类型',
            type: 'infra_redis_timeout_type'
          },
          {
            id: 106,
            name: '代码生成模板类型',
            type: 'infra_codegen_template_type'
          },
          {
            id: 107,
            name: '定时任务状态',
            type: 'infra_job_status'
          },
          {
            id: 108,
            name: '定时任务日志状态',
            type: 'infra_job_log_status'
          },
          {
            id: 109,
            name: '用户类型',
            type: 'user_type'
          },
          {
            id: 110,
            name: 'API 异常数据的处理状态',
            type: 'infra_api_error_log_process_status'
          },
          {
            id: 111,
            name: '短信渠道编码',
            type: 'system_sms_channel_code'
          },
          {
            id: 112,
            name: '短信模板的类型',
            type: 'system_sms_template_type'
          },
          {
            id: 113,
            name: '短信发送状态',
            type: 'system_sms_send_status'
          },
          {
            id: 114,
            name: '短信接收状态',
            type: 'system_sms_receive_status'
          },
          {
            id: 115,
            name: '错误码的类型',
            type: 'system_error_code_type'
          },
          {
            id: 116,
            name: '登陆日志的类型',
            type: 'system_login_type'
          },
          {
            id: 117,
            name: 'OA 请假类型',
            type: 'bpm_oa_leave_type'
          },
          {
            id: 122,
            name: '支付渠道微信版本',
            type: 'pay_channel_wechat_version'
          },
          {
            id: 127,
            name: '支付渠道支付宝算法类型',
            type: 'pay_channel_alipay_sign_type'
          },
          {
            id: 128,
            name: '支付渠道支付宝公钥类型',
            type: 'pay_channel_alipay_mode'
          },
          {
            id: 129,
            name: '支付宝网关地址',
            type: 'pay_channel_alipay_server_type'
          },
          {
            id: 130,
            name: '支付渠道编码类型',
            type: 'pay_channel_code_type'
          },
          {
            id: 131,
            name: '支付订单回调状态',
            type: 'pay_order_notify_status'
          },
          {
            id: 132,
            name: '支付订单状态',
            type: 'pay_order_status'
          },
          {
            id: 133,
            name: '支付订单退款状态',
            type: 'pay_order_refund_status'
          },
          {
            id: 134,
            name: '退款订单状态',
            type: 'pay_refund_order_status'
          },
          {
            id: 135,
            name: '退款订单类别',
            type: 'pay_refund_order_type'
          },
          {
            id: 138,
            name: '流程分类',
            type: 'bpm_model_category'
          },
          {
            id: 139,
            name: '流程实例的状态',
            type: 'bpm_process_instance_status'
          },
          {
            id: 140,
            name: '流程实例的结果',
            type: 'bpm_process_instance_result'
          },
          {
            id: 141,
            name: '流程的表单类型',
            type: 'bpm_model_form_type'
          },
          {
            id: 142,
            name: '任务分配规则的类型',
            type: 'bpm_task_assign_rule_type'
          },
          {
            id: 143,
            name: '任务分配自定义脚本',
            type: 'bpm_task_assign_script'
          },
          {
            id: 144,
            name: '代码生成的场景枚举',
            type: 'infra_codegen_scene'
          },
          {
            id: 145,
            name: '角色类型',
            type: 'system_role_type'
          },
          {
            id: 146,
            name: '文件存储器',
            type: 'infra_file_storage'
          },
          {
            id: '1725397422603571201',
            name: '功能模块',
            type: 'data_scope_module'
          }
        ],
        msg: ''
      }
    }
  }
]
