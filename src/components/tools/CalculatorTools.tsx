import React, { useState } from 'react';
import { Calculator, Info, RefreshCw, Landmark, Sparkles, TrendingUp } from 'lucide-react';

interface CalculatorToolProps {
  slug: string;
}

export function CalculatorTools({ slug }: CalculatorToolProps) {
  // Common states
  const [result, setResult] = useState<any>(null);

  // Age Calculator variables
  const [birthdate, setBirthdate] = useState<string>('1995-05-15');
  const [targetDate, setTargetDate] = useState<string>('2026-06-04');

  // EMI Calculator variables
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(5);

  // GST variables
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'add' | 'remove'>('add');

  // SIP investments
  const [monthlyInvest, setMonthlyInvest] = useState<number>(5000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // BMI variables
  const [weight, setWeight] = useState<number>(70); // kg
  const [height, setHeight] = useState<number>(175); // cm

  // Discount variables
  const [listPrice, setListPrice] = useState<number>(1999);
  const [discountPercent, setDiscountPercent] = useState<number>(15);

  // Compound variables
  const [initialSavings, setInitialSavings] = useState<number>(50000);
  const [compoundRate, setCompoundRate] = useState<number>(6.5);
  const [compoundYears, setCompoundYears] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // monthly

  // Percentage Suite variables
  const [pctNumA, setPctNumA] = useState<number>(80);
  const [pctNumB, setPctNumB] = useState<number>(250);

  // Math engines
  const runAgeCalculation = () => {
    if (!birthdate) return;
    const bDate = new Date(birthdate);
    const tDate = new Date(targetDate);
    
    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonthString = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonthString.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const differenceMs = tDate.getTime() - bDate.getTime();
    const totalDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalWeeks = Math.floor(totalDays / 7);

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
    });
  };

  const runEmiCalculation = () => {
    const P = principal;
    const r = (interestRate / 12) / 100;
    const n = tenure * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      percentageInterest: ((totalInterest / totalPayment) * 100).toFixed(1),
    });
  };

  const runGstCalculation = () => {
    const rateFraction = gstRate / 100;
    let computedGst = 0;
    let netAmount = 0;
    let grossAmount = 0;

    if (gstType === 'add') {
      computedGst = amount * rateFraction;
      netAmount = amount;
      grossAmount = amount + computedGst;
    } else {
      grossAmount = amount;
      netAmount = amount / (1 + rateFraction);
      computedGst = amount - netAmount;
    }

    setResult({
      type: gstType,
      rate: gstRate,
      base: netAmount.toFixed(2),
      tax: computedGst.toFixed(2),
      total: grossAmount.toFixed(2),
    });
  };

  const runSipCalculation = () => {
    const P = monthlyInvest;
    const i = (sipRate / 12) / 100;
    const n = sipYears * 12;

    const totalInvested = P * n;
    // SIP Future value formula: M = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const wealthGained = futureValue - totalInvested;

    setResult({
      invested: totalInvested.toFixed(2),
      gains: wealthGained.toFixed(2),
      total: futureValue.toFixed(2),
      percentReturns: ((wealthGained / totalInvested) * 100).toFixed(1),
    });
  };

  const runBmiCalculation = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let status = 'Underweight';
    let colorClass = 'text-sky-500 bg-sky-50 border-sky-200';
    if (bmi >= 18.5 && bmi < 24.9) {
      status = 'Healthy Weight (Ideal)';
      colorClass = 'text-green-600 bg-green-50 border-green-200';
    } else if (bmi >= 25 && bmi < 29.9) {
      status = 'Overweight';
      colorClass = 'text-amber-500 bg-amber-50 border-amber-200';
    } else if (bmi >= 30) {
      status = 'Obese';
      colorClass = 'text-rose-600 bg-rose-50 border-rose-200';
    }

    const lowerRange = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
    const upperRange = (24.9 * (heightInMeters * heightInMeters)).toFixed(1);

    setResult({
      bmi: bmi.toFixed(2),
      status,
      colorClass,
      idealRange: `${lowerRange} kg - ${upperRange} kg`,
    });
  };

  const runDiscountCalculation = () => {
    const savings = listPrice * (discountPercent / 100);
    const finalPrice = listPrice - savings;

    setResult({
      savings: savings.toFixed(2),
      total: finalPrice.toFixed(2),
      rate: discountPercent,
    });
  };

  const runCompoundInterest = () => {
    const P = initialSavings;
    const r = compoundRate / 100;
    const n = compoundFrequency;
    const t = compoundYears;

    // Compound Formula: A = P * (1 + r/n)^(nt)
    const futureAmount = P * Math.pow(1 + r/n, n * t);
    const totalGainedInterest = futureAmount - P;

    setResult({
      invested: P.toFixed(2),
      interest: totalGainedInterest.toFixed(2),
      total: futureAmount.toFixed(2),
    });
  };

  const runPercentageSuite = () => {
    // 1. What is A% of B?
    const valueOfPct = (pctNumA / 100) * pctNumB;
    // 2. What % of B is A?
    const fractionOfPct = (pctNumA / pctNumB) * 100;

    setResult({
      valueOfPct: valueOfPct.toFixed(2),
      fractionOfPct: fractionOfPct.toFixed(1),
    });
  };

  // Run automatically on mount/inputs or render sub-calculators
  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
      {/* 1. GST CALCULATOR */}
      {slug === 'gst-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">GST Parameters</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Base Amount</label>
                <input
                  id="gst_amount_input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tax Slab Rate (%)</label>
                  <select
                    id="gst_rate_select"
                    value={gstRate}
                    onChange={(e) => setGstRate(parseInt(e.target.value) || 18)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="5">5% SGST + CGST</option>
                    <option value="12">12% standard slab</option>
                    <option value="18">18% business standard</option>
                    <option value="28">28% luxury tax slab</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tax Action</label>
                  <div className="grid grid-cols-2 border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <button
                      id="gst_type_add_btn"
                      onClick={() => setGstType('add')}
                      className={`text-xs font-semibold py-2.5 ${gstType === 'add' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      Add (+)
                    </button>
                    <button
                      id="gst_type_remove_btn"
                      onClick={() => setGstType('remove')}
                      className={`text-xs font-semibold py-2.5 ${gstType === 'remove' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      Deduct (-)
                    </button>
                  </div>
                </div>
              </div>

              <button
                id="calculate_gst_btn"
                onClick={runGstCalculation}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
              >
                Determine Total Tax
              </button>
            </div>

            {/* GST Output */}
            <div className="flex flex-col justify-center">
              {result && result.rate === gstRate ? (
                <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-4">
                  <div className="text-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Gross Taxable Amount</span>
                    <div className="text-3xl font-bold text-blue-600 mt-1">${result.total}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-400">Net Base Cost:</span>
                      <div className="font-bold text-slate-700 mt-0.5">${result.base}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Estimated Tax Paid:</span>
                      <div className="font-bold text-slate-700 mt-0.5">${result.tax}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-sm py-8 font-mono">
                  Press calculateto begin computations.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. EMI CALCULATOR */}
      {slug === 'emi-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-blue-600" /> Mortgage & Loan Metrics
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Principal Asset Loan ($)</label>
                <input
                  id="emi_principal_input"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Interest Rate (% p.a.)</label>
                  <input
                    id="emi_rate_input"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tenure Period (Years)</label>
                  <input
                    id="emi_tenure_input"
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
              <button
                id="calculate_emi_btn"
                onClick={runEmiCalculation}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
              >
                Determine EMI Breakdown
              </button>
            </div>

            <div>
              {result ? (
                <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-4 shadow-2xs">
                  <div className="text-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Your Monthly Installments</span>
                    <div className="text-3xl font-extrabold text-blue-600 mt-0.5">${result.emi} / mo</div>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-slate-50 py-1">
                      <span className="text-slate-400">Total Borrowed Amount:</span>
                      <span className="font-bold text-slate-700">${principal}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 py-1">
                      <span className="text-slate-400">Total Paid back Amount:</span>
                      <span className="font-bold text-slate-700">${result.totalPayment}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 text-amber-500">Interest Payable Amount:</span>
                      <span className="font-bold text-amber-500">${result.totalInterest} ({result.percentageInterest}%)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 font-mono text-xs">
                  Inputs details to map interests amortization
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. SIP CALCULATOR */}
      {slug === 'sip-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Systematic SIP planner
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Monthly Investments ($)</label>
                <input
                  id="sip_amount_input"
                  type="number"
                  value={monthlyInvest}
                  onChange={(e) => setMonthlyInvest(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Expected Rate (% p.a.)</label>
                  <input
                    id="sip_rate_input"
                    type="number"
                    value={sipRate}
                    onChange={(e) => setSipRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Duration (Years)</label>
                  <input
                    id="sip_duration_input"
                    type="number"
                    value={sipYears}
                    onChange={(e) => setSipYears(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
              <button
                id="calculate_sip_btn"
                onClick={runSipCalculation}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
              >
                Determine Wealth Future
              </button>
            </div>

            <div>
              {result ? (
                <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-4 font-mono text-xs">
                  <div className="text-center pb-3 border-b border-slate-100 font-sans">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Estimated Accumulation</span>
                    <div className="text-3xl font-extrabold text-green-600 mt-1">${result.total}</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-400">Total Invested Principal:</span>
                      <span className="font-bold text-slate-700">${result.invested}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 text-green-500">Compounding Interest Gains:</span>
                      <span className="font-bold text-green-500">+${result.gains} ({result.percentReturns}%)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs font-mono">
                  Map systematic mutual savings plan growth charts
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. BMI CALCULATOR */}
      {slug === 'bmi-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Body Mass Profile index</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Weight (kg)</label>
                  <input
                    id="bmi_weight_input"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Height (cm)</label>
                  <input
                    id="bmi_height_input"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
              <button
                id="calculate_bmi_btn"
                onClick={runBmiCalculation}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
              >
                Determine BMI Scale
              </button>
            </div>

            <div>
              {result ? (
                <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-4">
                  <div className="text-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Your Body Mass Index</span>
                    <div className="text-4xl font-extrabold text-blue-600 mt-1">{result.bmi}</div>
                  </div>
                  <div className={`p-3 rounded-lg border text-center text-sm font-semibold uppercase ${result.colorClass}`}>
                    {result.status}
                  </div>
                  <div className="text-center text-xs text-slate-400 font-semibold uppercase">
                    Healthy weight goal for height: <span className="font-bold text-slate-600">{result.idealRange}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 font-mono text-xs">
                  Determine body indexes
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. AGE CALCULATOR */}
      {slug === 'age-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Precision Birthdate logs</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Select Date of Birth</label>
                <input
                  id="birthdate_input"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Age Date</label>
                <input
                  id="target_date_input"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                />
              </div>
              <button
                id="calculate_age_btn"
                onClick={runAgeCalculation}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
              >
                Determine Precise Age
              </button>
            </div>

            <div>
              {result ? (
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs font-mono text-xs">
                  <div className="text-center font-sans pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Precision Age Scale</span>
                    <div className="text-xl font-bold text-blue-600 mt-1">
                      {result.years} Years, {result.months} Months, {result.days} Days
                    </div>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs text-slate-600">
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span>Total Counted Days:</span>
                      <span className="font-bold text-slate-800">{result.totalDays} days</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span>Cumulative Weeks:</span>
                      <span className="font-bold text-slate-800">{result.totalWeeks} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Representative Hours:</span>
                      <span className="font-bold text-slate-800">{result.totalHours} hours</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 font-mono text-xs animate-pulse">
                  Provide dates to verify milestones timeline
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. GENERAL OPTION / FALLBACK INTEGRATIONS FOR OTHER SPECIFIED CONVERTERS/CALCS */}
      {!['gst-calculator', 'emi-calculator', 'sip-calculator', 'bmi-calculator', 'age-calculator'].includes(slug) && (
        <div className="space-y-6">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <Calculator className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 capitalize">{slug.replace(/-/g, ' ')} Module</h4>
              <p className="text-xs text-blue-700 mt-1">
                Calculate ratios, compound savings, sales markdowns or custom geometric balances in real-time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            {/* DISCOUNT PARAMETERS */}
            {slug === 'discount-calculator' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">Markdown Price Variables</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Standard List Price ($)</label>
                  <input
                    id="discount_price_input"
                    type="number"
                    value={listPrice}
                    onChange={(e) => setListPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Discount Rate (%)</label>
                  <input
                    id="discount_percent_input"
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <button
                  id="calculate_discount_btn"
                  onClick={runDiscountCalculation}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
                >
                  Calculate Discount Values
                </button>
              </div>
            )}

            {/* PERCENTAGE PARAMETERS */}
            {slug === 'percentage-calculator' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">Ratio Ranges Value Matrix</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value A (e.g. 50)</label>
                  <input
                    id="pct_val_a_input"
                    type="number"
                    value={pctNumA}
                    onChange={(e) => setPctNumA(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value B (e.g. 200)</label>
                  <input
                    id="pct_val_b_input"
                    type="number"
                    value={pctNumB}
                    onChange={(e) => setPctNumB(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <button
                  id="calculate_percentage_btn"
                  onClick={runPercentageSuite}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
                >
                  Retrieve Percentages
                </button>
              </div>
            )}

            {/* COMPOUND INTEREST */}
            {slug === 'compound-interest-calculator' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">Savings parameters</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Initial base Principal ($)</label>
                  <input
                    id="compound_principal_input"
                    type="number"
                    value={initialSavings}
                    onChange={(e) => setInitialSavings(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Interest (% p.a.)</label>
                    <input
                      id="compound_rate_input"
                      type="number"
                      value={compoundRate}
                      onChange={(e) => setCompoundRate(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Frequency</label>
                    <select
                      id="compound_freq_select"
                      value={compoundFrequency}
                      onChange={(e) => setCompoundFrequency(parseInt(e.target.value) || 12)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                    >
                      <option value="12">Monthly</option>
                      <option value="4">Quarterly</option>
                      <option value="1">Annually</option>
                    </select>
                  </div>
                </div>
                <button
                  id="calculate_compound_btn"
                  onClick={runCompoundInterest}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg"
                >
                  Retrieve Future Compounding
                </button>
              </div>
            )}

            {/* Outputs Fallback */}
            <div>
              {result ? (
                <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-4 font-mono text-xs">
                  <div className="text-center pb-2 border-b border-slate-100 font-sans">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Calculated Output Summary</span>
                  </div>
                  {slug === 'discount-calculator' && (
                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between border-b border-slate-50 py-1">
                        <span>Original Price:</span>
                        <span className="font-bold">${listPrice}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 py-1">
                        <span className="text-emerald-500 font-semibold">Total Savings:</span>
                        <span className="font-bold text-emerald-500">-${result.savings} ({result.rate}%)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-blue-600 font-bold">Sales Checkout Price:</span>
                        <span className="font-bold text-blue-600">${result.total}</span>
                      </div>
                    </div>
                  )}

                  {slug === 'percentage-calculator' && (
                    <div className="space-y-1.5 pb-2">
                      <div className="border-b border-slate-100 pb-2">
                        <span className="text-slate-400">What is {pctNumA}% of {pctNumB}?</span>
                        <div className="font-bold text-slate-800 text-lg mt-0.5">{result.valueOfPct}</div>
                      </div>
                      <div className="pt-1">
                        <span className="text-slate-400">What % of {pctNumB} is {pctNumA}?</span>
                        <div className="font-bold text-slate-800 text-lg mt-0.5">{result.fractionOfPct}%</div>
                      </div>
                    </div>
                  )}

                  {slug === 'compound-interest-calculator' && (
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-slate-50 pb-1">
                        <span>Original Principal:</span>
                        <span>${result.invested}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 pb-1">
                        <span className="text-emerald-600 font-medium">Interest Earned Goals:</span>
                        <span className="font-bold text-emerald-600">+${result.interest}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="font-bold text-slate-700">Total Accumulation:</span>
                        <span className="font-bold text-slate-800 text-sm">${result.total}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs font-mono">
                  Press calculate to begin computation details.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
