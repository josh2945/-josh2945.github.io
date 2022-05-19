import React, { useEffect , useState} from 'react';
import './App.css';
import "./externalcss.css";
import logo from './cmulogo.png';
import signature from './signature.svg';

const BASE_URL = 'https://api.exchangerate.host/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  //console.log(currencyOptions)

  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()

  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    fromAmount = amount 
    toAmount = amount / exchangeRate
  };

  //console.log(exchangeRate)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstcurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstcurrency)
        setExchangeRate(data.rates[firstcurrency])
      })
  }, [])

  function handleToAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  function handleFromAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  
  
  return (
    <div>
      <Header />
      <Credits />
      <br />
      <br />
      <br />
      <CurrencyRow2 currencyOptions={ currencyOptions } selectCurrency={fromCurrency} onChangeCurrency={e => setFromCurrency(e.target.value)} amount={fromAmount} onChangeAmount={handleFromAmountChange}/>
      <EqualSign />
      <CurrencyRow2 currencyOptions={ currencyOptions } selectCurrency={toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount} onChangeAmount={handleToAmountChange}/>
      <br />
      <br />
      <br />
      <CMUlink />
    </div>
  );
}

// Component #1
function Header () {
  return (
    <div>
      <h1>€URR£₦₡Y ₵ONV£R₸£R</h1>
    </div>
  );
}

// Component #2
function Credits () {
  return (
    <div>
      <h4>created by</h4>
      <img src={signature} alt="Josh Shettler's signature"/>
    </div>
  )
}

// Component #3
function CurrencyRow2 (props) {
  const { currencyOptions , selectCurrency , onChangeCurrency , amount , onChangeAmount} = props
  return (
    <div>
      <div class="input-group mb-3">
        <input type="number" class="form-control" aria-label="Currency Value" aria-describedby="Currency Value" value={amount} onChange={onChangeAmount}/>
        <select value={ selectCurrency } class="form-select" type="button" id="button-addon2" onChange={ onChangeCurrency }>
          { currencyOptions.map(option => (
            <option value={ option }>{ option }</option>
          ))}
        </select> 
      </div>
    </div>
  );
}

// Component #4
function EqualSign () {
  return (
    <div class="equals">
      =
    </div>
  );
}

// Component #5
function CMUlink () {
  return (
    <div>
      <a href = "https://www.coloradomesa.edu" target = "_blank" rel="noreferrer" class="cmu">
          <img 
            src={logo} 
            alt = "CMU logo"
          />
      </a>
    </div>
  );
}

export default App;
