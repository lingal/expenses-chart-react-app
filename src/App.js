import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';

function App() {
  const [expenses, setExpenses] = useState([]);

  const highestAmount = Math.max(...expenses.map((item) => item.amount));

  function getData() {
    axios
      .get('/data.json')
      .then((resp) => setExpenses(resp.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <header className="header">
        <div className="header-content">
          <div className="balance">
            <h4>My balance</h4>
            <h1>$921.48</h1>
          </div>
          <img src={logo} alt="logo" />
        </div>
      </header>

      <div className="expenses-container">
        <h2>Spending - Last 7 days</h2>
        <div className="charts">
          {expenses.map((item, id) => {
            console.log(item);
            const { amount, day } = item;
            return (
              <div key={id} className="chart">
                <div className="chart-tag">
                  <p>${amount}</p>
                </div>
                <div
                  className={
                    highestAmount === amount
                      ? 'chart-bar highest-amount'
                      : 'chart-bar'
                  }
                  style={{ height: `${amount * 3}px` }}
                ></div>
                <small>{day}</small>
              </div>
            );
          })}
        </div>

        <div className="divider"></div>

        <div className="footer">
          <div className="footer__left">
            <p>Total this month</p>
            <h4> $478.33</h4>
          </div>
          <div className="footer__right">
            <h4>+2.4%</h4>
            <p>from last month</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
