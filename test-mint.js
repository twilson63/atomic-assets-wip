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
//const DEVBAR = 'ULyZY0Lie3ozNiMUqMOmd0EPt8dJ4lHom4FSy_jytss'
async function main() {
  const tx = await arweave.createTransaction({ data: '1234' })
  tx.addTag('App-Name', 'SmartWeaveAction')
  tx.addTag('App-Version', '0.3.0')
  tx.addTag('Input', JSON.stringify({ function: 'mint' }))
  tx.addTag('Contract', TESTBAR)
  tx.fee = arweave.ar.arToWinston('0.05')
  //console.log(tx)
  await arweave.transactions.sign(tx, wallet)
  //console.log(tx.id)
  await arweave.transactions.post(tx)

}

main()