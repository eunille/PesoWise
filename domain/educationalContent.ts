/**
 * Educational Content for Investment Module
 * 
 * Data for educational cards explaining key investing concepts
 * relevant to Philippine investors
 */

export interface EducationalCard {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyPoints: string[];
}

export const EDUCATIONAL_CARDS: EducationalCard[] = [
  {
    id: 'what-is-index-fund',
    title: 'What is an Index Fund?',
    shortDescription: 'A fund that tracks a stock market index',
    fullDescription:
      'Index funds are investment funds designed to replicate the performance of a specific market index, such as the PSEi (Philippine Stock Exchange Index). Instead of a fund manager actively picking stocks, index funds hold the same stocks in the same proportions as the index. This provides instant diversification and typically lower fees compared to actively managed funds.',
    keyPoints: [
      'Tracks market index performance (e.g., PSEi)',
      'Lower fees due to passive management',
      'Instant diversification across many companies',
      'Suitable for long-term investing',
      'No need to pick individual stocks',
    ],
  },
  {
    id: 'power-of-compounding',
    title: 'The Power of Compounding',
    shortDescription: 'Your earnings grow exponentially over time',
    fullDescription:
      'Compounding is when your investment earnings generate their own earnings. Albert Einstein called it "the eighth wonder of the world." When you invest ₱1,000 at 8% annual return, you earn ₱80 in year 1. In year 2, you earn 8% on ₱1,080 (not just the original ₱1,000), which is ₱86.40. This snowball effect accelerates growth significantly over decades.',
    keyPoints: [
      'Earnings generate their own earnings',
      'Effect accelerates over time',
      'Time is your greatest asset',
      'Small monthly contributions compound significantly',
      'Starting early makes massive difference',
    ],
  },
  {
    id: 'diversification',
    title: 'Why Diversification Matters',
    shortDescription: 'Spread risk across different investments',
    fullDescription:
      'Diversification means spreading your money across different types of investments or sectors rather than putting all eggs in one basket. If one sector struggles, others may perform well, reducing overall risk. A diversified portfolio might include stocks from tech, banking, energy, and consumer sectors. Index funds provide instant diversification with a single investment.',
    keyPoints: [
      'Reduces risk from any single investment',
      'Performance of different assets varies',
      'Not all sectors move together',
      'Index funds provide automatic diversification',
      'Protects against unexpected industry downturns',
    ],
  },
  {
    id: 'peso-cost-averaging',
    title: 'Peso-Cost Averaging Strategy',
    shortDescription: 'Invest fixed amounts regularly regardless of price',
    fullDescription:
      'Peso-cost averaging (the Philippines version of dollar-cost averaging) means investing a fixed amount regularly—like ₱5,000 every month—regardless of whether the market is up or down. When prices are low, your pesos buy more shares. When prices are high, your pesos buy fewer shares. Over time, this smooths out the average cost per share and removes the pressure of trying to time the market perfectly.',
    keyPoints: [
      'Invest same amount on set schedule',
      'Remove emotion from investing',
      'Lower average cost per share',
      'Works especially well for beginners',
      'Takes advantage of market ups and downs',
    ],
  },
  {
    id: 'understanding-volatility',
    title: 'Understanding Market Volatility',
    shortDescription: 'Short-term ups and downs are normal',
    fullDescription:
      'Volatility is the fluctuation in investment prices. Stock markets naturally go up and down—sometimes dramatically in the short term. However, over decades, markets have consistently trended upward despite temporary setbacks. It\'s important to understand your risk tolerance and choose investments aligned with your time horizon. If you need the money in 2 years, volatility is risky. If you invest for 20 years, volatility is an opportunity.',
    keyPoints: [
      'Stock prices naturally fluctuate',
      'Short-term losses are temporary',
      'Long-term trends are positive',
      'Match investments to your time horizon',
      'Avoid panic selling during downturns',
    ],
  },
  {
    id: 'time-horizon-importance',
    title: 'Why Time Horizon Matters',
    shortDescription: 'Your investment timeline affects your strategy',
    fullDescription:
      'Time horizon is how long until you need your money. If you\'re investing for retirement in 20 years, you can tolerate shorter-term market swings and benefit from riskier (but higher-returning) assets. If you need the money in 1-2 years, you should prioritize stability over growth. Matching your investment strategy to your time horizon is crucial for achieving financial goals without excessive worry.',
    keyPoints: [
      'Long horizon: Can handle volatility for higher returns',
      'Short horizon: Prioritize stability and safety',
      'Retirement investing: 20-30 year horizon typical',
      'Emergency funds: Should not be invested in stocks',
      'Adjust strategy as you approach your goal date',
    ],
  },
];
