const Arweave = require('arweave')
const { WarpFactory, defaultCacheOptions } = require('warp-contracts')
const fs = require('fs')

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
//const arweave = Arweave.init({ host: 'localhost', port: 1984, protocol: 'http' })
const warp = WarpFactory.custom(arweave, defaultCacheOptions, 'mainnet')
  .useArweaveGateway()
  .build()

const TESTBAR = 'rjrEUljk4lfLyrTQbjkXNJGyKCh33b4CX-3gKM6GSFc'

//const DEVBAR = 'ULyZY0Lie3ozNiMUqMOmd0EPt8dJ4lHom4FSy_jytss'

async function main() {
  const res = await warp.contract(TESTBAR)
    .readState()
  console.log(res)
  console.log(JSON.stringify(res.cachedValue.state, null, 2))
}

main()