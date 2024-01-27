import { useState, React } from 'react';


function App() {

  const [income, setIncome] = useState();
  const [investMoney, setInvestMoney] = useState(0);
  const [savings, setSavings] = useState(0);
  const [debt, setDebt] = useState(0);
  const [spendingMoney, setSpendingMoney] = useState(0);

  const [sliderValues, setSliderValues] = useState([
    { name: 'Investments', value: 25 },
    { name: 'Savings', value: 25 },
    { name: 'Debt', value: 25 },
    { name: 'Spending', value: 25 },
  ]);


  const handleSliderChange = (index, newValue) => {
    const updatedValues = [...sliderValues];
    const total = updatedValues.reduce((acc, { value }, i) => (i === index ? acc + newValue : acc + value), 0);

    // Check if the total is less than or equal to 100 before updating
    if (total <= 100) {
      updatedValues[index].value = newValue;
      setSliderValues(updatedValues);
    }
  };

  function calculateBudget() {
    setInvestMoney(income*(sliderValues[0].value/100));
    setSavings(income*(sliderValues[1].value/100))
    setDebt(income*(sliderValues[2].value/100));
    setSpendingMoney(income*(sliderValues[3].value/100));
  }


  return (
    <div>
      <section class="bg-gradient-to-r from-indigo-400 to-cyan-400">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
              <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">BUDGET MAKER</h1>
              <p class="mb-8 text-2xl font-semibold text-amber-200">Input Monthly Income</p>

              <form class="max-w-[20%] mx-auto">
                  <input value={income} onChange={e => setIncome(e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$4,750" required />
              </form>

              <section>

                <div class='relative my-3 max-w-md mx-auto'>
                  {sliderValues.map((slider, index) => (
                    <div key={index} class='py-4'>
                      <h4 class="text-2xl font-bold dark:text-white">{slider.name}</h4>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={slider.value}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        onChange={(e) => handleSliderChange(index, parseFloat(e.target.value))}
                      />
                    </div>
                  ))}
                </div>

              </section>

              <button onClick={calculateBudget} type="button" class="mt-8 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                Generate
              </button>

              <div class='mt-8'>
                <h4 class="py-3 text-2xl font-bold dark:text-white">Investments: ${Math.round(investMoney)}</h4>
                <h4 class="py-3 text-2xl font-bold dark:text-white">Savings: ${Math.round(savings)}</h4>
                <h4 class="py-3 text-2xl font-bold dark:text-white">Debt: ${Math.round(debt)}</h4>
                <h4 class="py-3 text-2xl font-bold dark:text-white">Spending: ${Math.round(spendingMoney)}</h4>
              </div>

          </div>
      </section>

    </div>
  );
}

export default App;
