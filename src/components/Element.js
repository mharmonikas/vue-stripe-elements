import Vue from 'vue'

const element = {
  inject: ['elements'],
  // please see https://stripe.com/docs/elements/reference for details
  props: {
    value: {
      type: String,
      required: false
    },
    options: {
      type: Object,
      required: false
    }
  },
  async mounted() {
    // get stripe elements instance
    const elements = await this.elements
    const options = { ...this.options }
    options.style = { ...baseStyle, ...options.style }
    this._element = elements.create(this.type, options)
    this._element.on('blur', () => this.$emit('blur'))
    this._element.on('change', event => this.$emit('change', event))
    this._element.on('click', event => this.$emit('click', event))
    this._element.on('focus', () => this.$emit('focus'))
    this._element.on('ready', () => this.$emit('ready'))

    const el = document.createElement('div')
    this._element.mount(el)
    this.$el.appendChild(el)
  },
  beforeDestroy() {
    this._element.destroy()
  },
  methods: {
    element() {
      return this._element
    },
    blur() {
      this._element.blur()
    },
    clear() {
      this._element.clear()
    },
    focus() {
      this._element.focus()
    },
    update() {
      this._element.update()
    }
  },
  render(h) {
    return h('div')
  }
}

const baseStyle = {
  base: {
    color: '#32325d',
    lineHeight: '24px',
    fontFamily: 'Helvetica Neue',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}

export const getComponent = type =>
  Vue.component(type, {
    mixins: [element],
    data() {
      return {
        type
      }
    }
  })

export const Card = getComponent('card')
export const CardCvc = getComponent('cardCvc')
export const CardExpiry = getComponent('cardExpiry')
export const CardNumber = getComponent('cardNumber')
export const Iban = getComponent('iban')
export const IdealBank = getComponent('idealBank')
export const PaymentRequestButton = getComponent('paymentRequestButton')
