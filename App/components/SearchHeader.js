import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    LayoutAnimation,
    TextInput,
    Text,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    UIManager,
    Alert,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import Icon from "react-native-vector-icons/Octicons";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import AdjustFontSize from './AdjustFontSize';

const { width, height } = Dimensions.get('window');

export default function SearchHeader({ navigation }) {

    const [searchText, setSearchText] = useState('');

    // const searchTextNavigation = (searchtext) => {
    //     if (searchtext == "") {
    //         Alert.alert('Search Something')
    //     } else {
    //         navigation.navigate('SearchProduct', { searchtext })
    //     }
    // }

    return (
        <View style={{ width: '100%', height: AdjustFontSize(70), backgroundColor: '#DAC7ED', justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ flex: .15, justifyContent: 'center' }}>
                <IconMaterial name='menu' size={AdjustFontSize(30)} color='#fff' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
            <TouchableOpacity //onPress={() => navigation.navigate('SearchProduct')}
                style={{ flex: 1, height: AdjustFontSize(35), backgroundColor: '#fff', borderRadius: 40, alignSelf: 'center', flexDirection: 'row', marginRight: 10 }}>
                <Text style={{ fontSize: AdjustFontSize(14), flex: 1, marginHorizontal: 20, alignSelf: 'center', color: '#b2b2b4' }}>{'Search'}</Text>
                <View style={{ backgroundColor: '#cdcdcd', width: 1, height: '100%' }}></View>
                <View style={{ alignSelf: 'center' }}>
                    <Icon name={'search'} size={AdjustFontSize(20)} style={{ alignSelf: 'center', marginHorizontal: 20, color: '#cdcdcd' }}></Icon>
                </View>
            </TouchableOpacity>
        </View>
    )
}