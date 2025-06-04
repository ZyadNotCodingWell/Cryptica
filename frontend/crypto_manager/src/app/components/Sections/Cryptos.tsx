"use client";
import { motion } from "framer-motion";

const cryptos = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    icon: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    icon: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
  },
  {
    name: "XRP",
    symbol: "XRP",
    icon: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    icon: "https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    icon: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    icon: "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    icon: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg",
  },
  {
    name: "Optimism",
    symbol: "OP",
    icon: "https://assets.coingecko.com/coins/images/25244/large/Optimism.png",
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    icon: "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png",
  },
  {
    name: "Aptos",
    symbol: "APT",
    icon: "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png",
  },
];


// Duplicate for seamless looping
const fullList = [...cryptos, ...cryptos];

export default function Cryptos() {
  return (
    <section className="py-32 px-6 md:px-24 relative">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-200 mb-6">
          Discover a Large Selection of Coins
        </h2>
        <p className="text-neutral-400 max-w-xl text-lg">
          Track real-time and forecasted data for your favorite cryptocurrencies, all in one dashboard.
        </p>
      </div>

      {/* Infinite carousel with gradient mask */}
      <div className="relative w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent_15%,black_35%,black_65%,transparent_85%)]">
        <div className="pointer-events-none absolute inset-0 z-10" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {fullList.map((crypto, index) => (
            <div
              key={index}
              className="bg-neutral-900/40 backdrop-blur-md border border-white/10 shadow-inner p-4 rounded-2xl w-28 h-28 flex flex-col items-center justify-center shrink-0"
            >
              <img
                src={crypto.icon}
                alt={crypto.name}
                className="w-10 h-10 mb-2"
              />
              <div className="text-sm text-neutral-200 font-medium">
                {crypto.symbol}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
