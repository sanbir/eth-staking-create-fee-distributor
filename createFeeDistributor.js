const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

async function main() {
    if (process.argv.length < 6) {
        if (!process.env.RPC_URL
            || !process.env.PRIVATE_KEY
            || !process.env.FEE_DISTRIBUTOR_FACTORY_ADDRESS
            || !process.env.CLIENT_ADDRESS) {

            console.error('Args not provided')
            process.exit(1)
        }
    }

    const provider = new ethers.providers.JsonRpcProvider(process.argv[2] || process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.argv[3] || process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync("./FeeDistributorFactory.abi", "utf8")
    const feeDistributorFactory = new ethers.Contract(process.argv[4] || process.env.FEE_DISTRIBUTOR_FACTORY_ADDRESS, abi, wallet)

    // start listening to the FeeDistributorCreated events
    provider.on(feeDistributorFactory.filters["FeeDistributorCreated(address)"](), async (log) => {
        try {
            // retrieve the address of the newly created FeeDistributor contract from the event
            const parsedLog = feeDistributorFactory.interface.parseLog(log);
            const newlyCreatedFeeDistributorAddress = parsedLog.args.newFeeDistributorAddrress

            console.log(newlyCreatedFeeDistributorAddress)
        } catch (err) {
            console.error(err)
            process.exit(1)
        }
    })

    // create an instance of FeeDistributor for the client
    const createFeeDistributorTxReceipt = await feeDistributorFactory.createFeeDistributor(process.argv[5] || process.env.CLIENT_ADDRESS)

    // wait for 2 blocks to avoid a prematute exit
    await createFeeDistributorTxReceipt.wait(2)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
