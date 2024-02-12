"use client"

import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"

export default function Web3Provider({children}:{children: any}){
  
    return(
        <ThirdwebProvider activeChain={ChainId.Goerli} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
            {children}
        </ThirdwebProvider>
    )
}