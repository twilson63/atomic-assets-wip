const Arweave = require('arweave')
const { WarpFactory, defaultCacheOptions } = require('warp-contracts')
const fs = require('fs')

const wallet = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
//const arweave = Arweave.init({ host: 'localhost', port: 1984, protocol: 'http' })

const warp = WarpFactory.custom(arweave, defaultCacheOptions, 'mainnet')
  .useArweaveGateway()
  .build()

const TESTBAR = 'rjrEUljk4lfLyrTQbjkXNJGyKCh33b4CX-3gKM6GSFc'
// const DEVBAR = 'ULyZY0Lie3ozNiMUqMOmd0EPt8dJ4lHom4FSy_jytss'
const target = 'AdPC5pHq0IRC2EWdkPnjni_t-hzwD5QuskF1qe4xGHU'
const qty = 500 // arweave.ar.arToWinston('0.1')
async function main() {
  const tx = await arweave.createTransaction({ data: '1234' })
  tx.addTag('App-Name', 'SmartWeaveAction')
  tx.addTag('App-Version', '0.3.0')
  tx.addTag('Input', JSON.stringify({ function: 'transfer', target, qty }))
  tx.addTag('Contract', TESTBAR)

  await arweave.transactions.sign(tx, wallet)

  await arweave.transactions.post(tx)

}

main()