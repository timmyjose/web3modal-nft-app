import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RootParamsList } from '../../App'
import { useWeb3Modal } from '@web3modal/wagmi-react-native'
import { useAccount } from 'wagmi'

export default function NFTDemo() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  const { open } = useWeb3Modal()
  const account = useAccount()
  console.log('account = ', account)

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => open({ view: 'Account'})}>
        <Text style={styles.text}>Connect</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Go Back</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
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