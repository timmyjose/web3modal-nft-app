import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RootParamsList } from '../../App'
import { W3mButton } from '@web3modal/wagmi-react-native'
import  mintAbi from '../../abis/MintAbi.json'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { sepolia } from 'viem/chains'
import { useSignTypedData } from 'wagmi'

export default function Mint() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  const { data: contractName, isError, isSuccess, isLoading } = useContractRead({
    address:  '0x727372df1a4944a242090cbe12a4579d3de89a7e',
    abi: mintAbi,
    functionName: 'name',
    chainId: sepolia
  })

  const { config: writeConfig } = usePrepareContractWrite({
    address:  '0x727372df1a4944a242090cbe12a4579d3de89a7e',
    abi: mintAbi,
    functionName: 'safeMint',
    args: ['0x6024BD885fc659B02417c2e31e7037037685f3d2'],
    // chainId: sepolia
  })

  const { data: mintData, isLoading: isLoadingMint, isError: isErrorMint, isSuccess: isSuccessMint, write: mint} = useContractWrite(writeConfig)

  // signing typed data

  // All properties on a domain are optional
  const domain = {
    // name: 'Ether Mail',
    // version: '1',
    // chainId: sepolia,
    // verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  } as const
   
  // The named list of all type definitions
  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  } as const
   
  const message = {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  } as const

  const { data: signedData, isError: isErrorSign, isLoading: isLoadingSign, isSuccess: isSuccessSign, signTypedData } =
    useSignTypedData({
      domain,
      message: message,
      primaryType: 'Mail',
      types: types
    })
 
  return (
    <View style={styles.container}>
      {isLoading && (<Text style={styles.text}>Loading...</Text>)}
      {isSuccess && (<Text style={styles.text}>Name: {contractName} </Text>)}
      {isError && (<Text style={styles.text}>Failed to read contract name</Text>)}
      {isLoadingMint && (<Text style={styles.text}>Loading...</Text>)}
      {!isLoading && (<Pressable style={styles.button} onPress={() => mint()}>
        <Text style={styles.text}>Mint</Text>
      </Pressable>)}
      {isSuccessMint && (<Text style={styles.text}>Minted: {JSON.stringify(mintData)}</Text>)}
      {isErrorMint && (<Text style={styles.text}>Failed to mint</Text>)}
      {!isLoading && (<Pressable style={styles.button} onPress={() => signTypedData()}>
          <Text style={styles.text}>Sign</Text>
        </Pressable>)}
      {isSuccessSign && (<Text style={styles.text}>Signed: {JSON.stringify(signedData)}</Text>)}
      {isErrorSign && (<Text style={styles.text}>Failed to sign</Text>)}
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Go Back</Text>
      </Pressable>
      <W3mButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 12
  }
})