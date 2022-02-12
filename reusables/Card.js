import React from 'react';
import { Image, StyleSheet, Text,View } from 'react-native';
import { colorPallet } from '../constants/colorpallet';

export default function Card({i,t,p,a}) {
  return (
      <View style={styles.card}>
        <Image source={{uri: i}} style={styles.img} resizeMode={'cover'}/>
        <View style={styles.info}> 
            <Text style={styles.Title}>{t}</Text>
            <Text style={styles.Author}>{a}</Text>
            <Text style={styles.Publisher}>{p}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    margin: 5,
    borderColor: colorPallet.primaryLight,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  img:{
    width: '50%',
    height: '100%',
    borderRadius: 10
  },
  info:{
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  Title: {
    fontWeight: 'bold',
    color: colorPallet.primaryDark,
},
Publisher: {
    fontWeight: '500',
    color: colorPallet.subheading,
},
Author: {
    color: colorPallet.primary,
    fontWeight: '700',
},
})