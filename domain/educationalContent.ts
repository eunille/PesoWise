/**
 * Educational Content for Investment Module
 * 
 * Simplified, real-world examples for Filipino investors
 * Easy to understand, practical concepts
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
    shortDescription: 'Own a piece of the whole market',
    fullDescription:
      'Think of it like owning a tiny piece of every major company in the Philippines. Instead of picking one stock (risky!), an index fund like the PSEi gives you ownership in 30 top companies—BDO, JFC, Ayala, etc. If one company struggles, others usually do well. You don\'t need to be smart about picking winners; you just own the whole market.',
    keyPoints: [
      'You own many companies at once = lower risk',
      'No need to research individual stocks',
      'Costs less than hiring a fund manager',
      'Perfect for beginners and busy people',
      'Has worked for 40+ years in the Philippines',
    ],
  },
  {
    id: 'power-of-compounding',
    title: 'The Power of Compounding',
    shortDescription: 'Small amounts grow BIG over time',
    fullDescription:
      'Invest ₱5,000 today. Next year, you earn ₱400 (8% return). Year 2? You earn ₱432 on ₱5,400. Your money earns money, which earns more money. It\'s like planting a seed—it grows into a tree, then that tree makes more seeds. After 20 years, ₱5,000 can become ₱23,000+ without lifting a finger. The longer you wait, the more dramatic the growth.',
    keyPoints: [
      '₱5,000/month for 20 years = ₱2.4M (at 8% growth)',
      'The first 10 years matter more than you think',
      'Waiting 5 extra years = much bigger reward',
      'This is why starting young is a superpower',
      'Even ₱1,000/month works if you repatient,'
    ],
  },
  {
    id: 'diversification',
    title: 'Why Diversification Matters',
    shortDescription: 'Don\'t put all eggs in one basket',
    fullDescription:
      'Imagine putting ₱100,000 only in BDO stock. If their business struggles, you lose big. But if you own BDO + JFC + Energy companies + Healthcare stocks, when one dips, others often rise. It\'s like having insurance—you reduce your risk without sacrificing returns. An index fund does this automatically.',
    keyPoints: [
      'One company can fail; many won\'t',
      'Banking sector had a tough 2020, but healthcare boomed',
      'Mix of different industries protects you',
      'Real story: Someone who owned only BDO in 2008 lost 70%',
      'Index funds spread you across 25-30 companies instantly',
    ],
  },
  {
    id: 'peso-cost-averaging',
    title: 'Peso-Cost Averaging (DCA)',
    shortDescription: 'Invest the same amount every month—simple!',
    fullDescription:
      'Don\'t try to guess when to invest. Just invest ₱5,000 every month no matter what. When prices are high? Buy less shares. When prices are low? Buy more shares. Over time, you buy at an average price. You remove the stress of "Is this a good time to invest?" and the answer is always: "Yes, because it\'s ₱5,000, same as always."',
    keyPoints: [
      'Monthly discipline beats market timing',
      'Example: Invest ₱5,000 for 60 months = ₱300k invested',
      'Reduces the fear of buying at the "wrong" price',
      'Returns in Week 1 are usually negative (that\'s ok!)',
      'Perfect for salary earners setting up auto-invest',
    ],
  },
  {
    id: 'understanding-volatility',
    title: 'Understanding Market Volatility',
    shortDescription: 'Ups and downs are normal—don\'t panic!',
    fullDescription:
      'The stock market jumped 200 points today, dropped 150 tomorrow. This is normal! Short-term noise. But zoom out 20 years? The trend is always up. A young investor can ignore monthly swings. An older investor close to retirement should care more. Match your mindset to your timeline.',
    keyPoints: [
      'Stock markets have crashed 5+ times; always recovered',
      'PSEi lost 35% in 2008, gained 300% over next 10 years',
      'Check your investments yearly, not daily',
      '"Bad days" are actually buying opportunities for young people',
      'If you panic-sold in 2020, you missed today\'s gains',
    ],
  },
  {
    id: 'time-horizon-importance',
    title: 'Why Time Horizon Matters',
    shortDescription: 'Your timeline = your investment strategy',
    fullDescription:
      'Investing for retirement (20+ years)? Take more risk, ₱100k in stocks. Need your money in 2 years? Keep it in safer places. Your age and goals matter more than the interest rate. A 25-year-old investing ₱50,000 for retirement can ignore a market crash. A 58-year-old about to retire cannot.',
    keyPoints: [
      'Age 25, investing to age 60? You can take big risks',
      'Need money for house down payment in 2 years? Stay safe',
      'Emergency fund (6 months expenses)? Don\'t invest it',
      'Different money, different places: emergency vs. growth',
      'Adjust strategy every 5 years as you age',
    ],
  },
];
