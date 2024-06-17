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
import IconBack from "react-native-vector-icons/Ionicons";
import AdjustFontSize from './AdjustFontSize';

const { width, height } = Dimensions.get('window');

export default function BackHeader({ navigation, text }) {


    return (
        <View style={{ width: '100%', height: AdjustFontSize(50), backgroundColor: '#DAC7ED', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', position: 'absolute', left: 0 }}>
                <IconBack name='chevron-back' size={AdjustFontSize(30)} color='#fff' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: AdjustFontSize(14), fontWeight: '500', color: '#fff', alignSelf: 'center' }}>{text}</Text>
            </View>
        </View>
    )
}