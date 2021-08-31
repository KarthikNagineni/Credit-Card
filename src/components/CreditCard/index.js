/* eslint-disable guard-for-in */
import {Component} from 'react'

import './index.css'

class CreditCard extends Component {
  state = {
    isFront: true,
    stateCardNum: ['####', '####', '####', '####'],
    stateCardHolder: 'FULL NAME',
    stateMonth: 'MM',
    stateYear: 'YY',
    stateCVV: '',
    stateCardType: 'VISA',
    numFocus: false,
    nameFocus: false,
    expiryFocus: false,
    stateNumError: false,
    stateCVVError: false,
  }

  getCardType = cardNum => {
    let payCardType = ''
    const regexMap = [
      {regEx: /^4[0-9]{5}/gi, cardType: 'VISA'},
      {regEx: /^5[1-5][0-9]{4}/gi, cardType: 'MASTERCARD'},
      {regEx: /^3[47][0-9]{3}/gi, cardType: 'AMEX'},
      {regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: 'MAESTRO'},
    ]

    // eslint-disable-next-line no-restricted-syntax
    for (const j in regexMap) {
      if (cardNum.match(regexMap[j].regEx)) {
        payCardType = regexMap[j].cardType
        break
      }
    }

    if (
      cardNum.indexOf('50') === 0 ||
      cardNum.indexOf('60') === 0 ||
      cardNum.indexOf('65') === 0
    ) {
      const g = '508500-508999|606985-607984|608001-608500|652150-653149'
      const i = g.split('|')

      // eslint-disable-next-line guard-for-in
      // eslint-disable-next-line no-restricted-syntax
      for (const d in i) {
        const c = parseInt(i[d].split('-')[0], 10)
        const f = parseInt(i[d].split('-')[1], 10)
        if (
          cardNum.substr(0, 6) >= c &&
          cardNum.substr(0, 6) <= f &&
          cardNum.length >= 6
        ) {
          payCardType = 'RUPAY'
          break
        }
      }
    }
    return payCardType
  }

  numberChanged = event => {
    let myNumber = ''
    // eslint-disable-next-line no-restricted-syntax
    for (const i of event.target.value) {
      if (i !== ' ') {
        myNumber += i
      }
    }
    const re = /^[0-9\b]+$/
    console.log(re)

    if (myNumber === '' || re.test(myNumber)) {
      const myCard = this.getCardType(myNumber)
      console.log(myCard)

      const numberLen = myNumber.length
      if (numberLen < 17) {
        const hashLength = 16 - numberLen
        const hashString = '#'.repeat(hashLength)
        const finalString = myNumber + hashString
        const finalArray = finalString.split('')
        const arr1 = finalArray.slice(0, 4).join('')
        const arr2 = finalArray.slice(4, 8).join('')
        const arr3 = finalArray.slice(8, 12).join('')
        const arr4 = finalArray.slice(12, 16).join('')
        const cardNumArray = [arr1, arr2, arr3, arr4]
        if (myCard === '') {
          this.setState({
            stateCardNum: cardNumArray,
            stateCardType: 'VISA',
            stateNumError: false,
          })
        } else {
          this.setState({
            stateCardNum: cardNumArray,
            stateCardType: myCard,
            stateNumError: false,
          })
        }
      }
    } else {
      this.setState({stateNumError: true})
    }
  }

  numberFocused = () => {
    this.setState({
      isFront: true,
      numFocus: true,
      nameFocus: false,
      expiryFocus: false,
    })
  }

  nameChanged = event => {
    this.setState({stateCardHolder: event.target.value.toUpperCase()})
  }

  nameFocused = () => {
    this.setState({
      isFront: true,
      numFocus: false,
      nameFocus: true,
      expiryFocus: false,
    })
  }

  monthChanged = event => {
    if (event.target.value === 'Month') {
      this.setState({stateMonth: 'MM'})
    } else {
      this.setState({
        stateMonth: event.target.value,
      })
    }
  }

  monthFocused = () => {
    this.setState({
      isFront: true,
      numFocus: false,
      nameFocus: false,
      expiryFocus: true,
    })
  }

  yearChanged = event => {
    if (event.target.value === 'Year') {
      this.setState({stateYear: 'YY'})
    } else if (event.target.value % 100 < 10) {
      const YY = event.target.value % 100
      this.setState({
        stateYear: '0'.toString() + YY.toString(),
      })
    } else {
      this.setState({
        stateYear: event.target.value % 100,
      })
    }
  }

  yearFocused = () => {
    this.setState({
      isFront: true,
      numFocus: false,
      nameFocus: false,
      expiryFocus: true,
    })
  }

  cvvChanged = event => {
    const re = /^[0-9\b]+$/
    console.log(re)

    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({stateCVV: event.target.value, stateCVVError: false})
    } else {
      this.setState({stateCVVError: true})
    }
  }

  cvvFocused = () => {
    this.setState({isFront: false})
  }

  getUniqueCard = () => {
    let cardObject = {}
    const {stateCardType} = this.state
    if (stateCardType === 'VISA') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-visa',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630298765/visa_ueyucf.png',
        cardImageClass: 'card-type-visa',
        altText: 'VISA',
      }
    } else if (stateCardType === 'DISCOVER') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-discover',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630298891/discover_u53v2s.png',
        cardImageClass: 'card-type-discover',
        altText: 'DISCOVER',
      }
    } else if (stateCardType === 'MASTERCARD') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-master',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/mastercard_ikjs9p.png',
        cardImageClass: 'card-type-master',
        altText: 'MASTER',
      }
    } else if (stateCardType === 'MAESTRO') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-maestro',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630300776/Maestro_Logo.svg_f7ti91.png',
        cardImageClass: 'card-type-maestro',
        altText: 'MAESTRO',
      }
    } else if (stateCardType === 'DINNERS') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-dinner',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299150/dinersclub_lbpsgx.png',
        cardImageClass: 'card-type-dinner',
        altText: 'DINNER CLUB',
      }
    } else if (stateCardType === 'JCB') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-jcb',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/jcb_mwpgul.png',
        cardImageClass: 'card-type-jcb',
        altText: 'JCB',
      }
    } else if (stateCardType === 'AMEX') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-amex',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630300025/amex_wzpr55.png',
        cardImageClass: 'card-type-amex',
        altText: 'AMEX',
      }
    } else if (stateCardType === 'TROY') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-troy',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/troy_jf1am7.png',
        cardImageClass: 'card-type-troy',
        altText: 'TROY',
      }
    } else if (stateCardType === 'UNIPAY') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-union',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/unionpay_trr0r7.png',
        cardImageClass: 'card-type-union',
        altText: 'UNION PAY',
      }
    } else if (stateCardType === 'RUPAY') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-rupee',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630301048/1024px-Rupay-Logo_g8gdum.png',
        cardImageClass: 'card-type-rupee',
        altText: 'RUPEE',
      }
    }
    return cardObject
  }

  renderCardFront = () => {
    const {
      numFocus,
      nameFocus,
      expiryFocus,
      stateCardNum,
      stateCardHolder,
      stateMonth,
      stateYear,
    } = this.state

    const numContStyle = numFocus
      ? 'card-num-main-cont-select'
      : 'card-num-main-cont'

    const nameContStyle = nameFocus
      ? 'card-name-main-cont-selected'
      : 'card-name-main-cont'

    const expiryContStyle = expiryFocus
      ? 'card-cvv-main-cont-selected'
      : 'card-cvv-main-cont'

    const myCardObject = this.getUniqueCard()
    console.log(myCardObject)

    return (
      <div
        className={`credit-card-main-front-cont ${myCardObject.cardBackground}`}
      >
        <div className="card-type-cont">
          <img
            src="https://res.cloudinary.com/dns3bxdp9/image/upload/v1630298639/chip_d15wcv.png"
            className="chip-img"
            alt="chip"
          />
          <img
            src={myCardObject.cardImage}
            className={myCardObject.cardImageClass}
            alt={myCardObject.altText}
          />
        </div>
        <div className={numContStyle}>
          {stateCardNum.map(eachNum => (
            <p className="card-num">{eachNum}</p>
          ))}
        </div>
        <div className="card-name-cvv-mai-cont">
          <div className={nameContStyle}>
            <p className="card-name-cvv-heading">Card Holder</p>
            {stateCardHolder !== '' ? (
              <p className="card-holder-name">{stateCardHolder}</p>
            ) : (
              <p className="card-holder-name">FULL NAME</p>
            )}
          </div>
          <div className={expiryContStyle}>
            <p className="card-name-cvv-heading">Expires</p>
            <p className="card-holder-name">
              {stateMonth} / {stateYear}
            </p>
          </div>
        </div>
      </div>
    )
  }

  renderCardBack = () => {
    const {stateCVV} = this.state
    const myCardObject = this.getUniqueCard()
    console.log(myCardObject)
    return (
      <div
        className={`credit-card-main-back-cont ${myCardObject.cardBackground}`}
      >
        <p className="blank-black">{}</p>
        <div className="card-bottom-cont">
          <div className="card-back-cvv-main-cont">
            <p className="card-back-cvv-heading">CVV</p>
            <p className="card-cvv-num-block">{stateCVV}</p>
          </div>

          <div className="cart-type-back-logo-cont">
            <img
              src={myCardObject.cardImage}
              className={myCardObject.cardImageClass}
              alt={myCardObject.altText}
            />
          </div>
        </div>
      </div>
    )
  }

  submitForm = event => {
    event.preventDefault()
    this.setState({isFront: true})
  }

  render() {
    const {isFront, stateNumError, stateCVVError} = this.state

    const numMonths = [...Array(12).keys()]
    const myMonths = numMonths.map(eachNum => {
      if (eachNum < 9) {
        return '0'.toString() + (eachNum + 1).toString()
      }
      return eachNum + 1
    })
    const monthsArray = ['Month', ...myMonths]

    const numYears = [...Array(50).keys()]
    const myYears = numYears.map(eachNum => eachNum + 2001)
    const yearsArray = ['Year', ...myYears]

    return (
      <div className="main-bg-out-container">
        <div className="main-bg-container">
          {isFront ? this.renderCardFront() : this.renderCardBack()}

          <form className="input-main-cont" onSubmit={this.submitForm}>
            <p className="side-headings">Card Number</p>
            <input
              type="text"
              className="card-num-name-input"
              maxLength={19}
              onChange={this.numberChanged}
              onFocus={this.numberFocused}
            />
            {stateNumError && (
              <p className="error-msg">Card Number should only be in numbers</p>
            )}
            <p className="side-headings">Card Holders</p>
            <input
              type="text"
              className="card-num-name-input"
              maxLength={20}
              onChange={this.nameChanged}
              onFocus={this.nameFocused}
            />

            <div className="exp-cvv-heading-cont">
              <p className="side-headings">Expiration Date</p>
              <p className="side-headings">CVV</p>
            </div>
            <div className="exp-cvv-values-cont">
              <select
                className="exp-cvv-input"
                onChange={this.monthChanged}
                onFocus={this.monthFocused}
              >
                {monthsArray.map(eachMonth => (
                  <option value={eachMonth}>{eachMonth}</option>
                ))}
              </select>
              <select
                className="exp-cvv-input"
                onChange={this.yearChanged}
                onFocus={this.yearFocused}
              >
                {yearsArray.map(eachYear => (
                  <option value={eachYear}>{eachYear}</option>
                ))}
              </select>
              <input
                type="text"
                className="exp-cvv-input"
                maxLength={4}
                onChange={this.cvvChanged}
                onFocus={this.cvvFocused}
              />
            </div>
            {stateCVVError && (
              <p className="error-msg">CVV should only be in numbers</p>
            )}
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreditCard

/*
       let cardObject = {}

    if (stateCardType === 'VISA') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-visa',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630298765/visa_ueyucf.png',
        cardImageClass: 'card-type-visa',
        altText: 'VISA',
      }
    } else if (stateCardType === 'DISCOVER') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-discover',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630298891/discover_u53v2s.png',
        cardImageClass: 'card-type-discover',
        altText: 'DISCOVER',
      }
    } else if (stateCardType === 'MASTERCARD') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-master',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/mastercard_ikjs9p.png',
        cardImageClass: 'card-type-master',
        altText: 'MASTER',
      }
    } else if (stateCardType === 'MAESTRO') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-maestro',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630300776/Maestro_Logo.svg_f7ti91.png',
        cardImageClass: 'card-type-maestro',
        altText: 'MAESTRO',
      }
    } else if (stateCardType === 'DINNERS') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-dinner',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299150/dinersclub_lbpsgx.png',
        cardImageClass: 'card-type-dinner',
        altText: 'DINNER CLUB',
      }
    } else if (stateCardType === 'JCB') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-jcb',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/jcb_mwpgul.png',
        cardImageClass: 'card-type-jcb',
        altText: 'JCB',
      }
    } else if (stateCardType === 'AMEX') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-amex',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630300025/amex_wzpr55.png',
        cardImageClass: 'card-type-amex',
        altText: 'AMEX',
      }
    } else if (stateCardType === 'TROY') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-troy',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/troy_jf1am7.png',
        cardImageClass: 'card-type-troy',
        altText: 'TROY',
      }
    } else if (stateCardType === 'UNIPAY') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-union',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630299168/unionpay_trr0r7.png',
        cardImageClass: 'card-type-union',
        altText: 'UNION PAY',
      }
    } else if (stateCardType === 'RUPAY') {
      cardObject = {
        cardBackground: 'credit-card-main-front-cont-rupee',
        cardImage:
          'https://res.cloudinary.com/dns3bxdp9/image/upload/v1630301048/1024px-Rupay-Logo_g8gdum.png',
        cardImageClass: 'card-type-rupee',
        altText: 'RUPEE',
      }
    }

          */
