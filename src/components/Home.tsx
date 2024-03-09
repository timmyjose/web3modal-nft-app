import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RootParamsList } from '../App'

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('NFTDemo')}>
        <Text style={styles.text}>NFT Demo</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Mint')}>
        <Text style={styles.text}>Mint</Text>
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
