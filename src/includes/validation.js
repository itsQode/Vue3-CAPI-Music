import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('password_missmatch', confirmed)
    defineRule('excluded', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `وارد کردن مقدار ${ctx.field} اجباریست`,
          min: `The field ${ctx.field} is to short.`,
          max: `The field ${ctx.field} is to long.`,
          aplha_spaces: `The field ${ctx.field} may only contain alphabetical characres and spaces.`,
          email: `The field ${ctx.field} msut be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too long.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          password_missmatch: `The password dosn't match.`,
          tos: `You msut accept the term of service.`
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`

        return message
      }
    })
  }
}
