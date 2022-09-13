const Arweave = require('arweave')
const { WarpFactory, defaultCacheOptions } = require('warp-contracts')
const fs = require('fs')

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
//const arweave = Arweave.init({ host: 'localhost', port: 1984, protocol: 'http' })
const warp = WarpFactory.custom(arweave, defaultCacheOptions, 'mainnet')
  .useArweaveGateway()
  .build()

const src = fs.readFileSync('./contract.js', 'utf-8')
const wallet = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))

async function main() {
  const res = await warp.createContract.deploy({
    src,
    initState: JSON.stringify({
      balances: {},
      canEvolve: true,
      claimable: [],
      claims: [],
      name: 'TEST-BAR-v6',
      settings: [["isTradeable", true]],
      ticker: "BAR"
    }),
    wallet
  })
  console.log(res)
}

main()