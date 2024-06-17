import * as React from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    TextInput,
    Text,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    LogBox,
    PixelRatio,
    PermissionsAndroid,
    BackHandler,
    ImageBackground,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdjustFontSize from "./components/AdjustFontSize";
import Header from "./components/Header";
import VirtualizedScrollView from "./components/VirtualizedScrollView";
import IonIcon from "react-native-vector-icons/Ionicons";


export default function Signup({ navigation }) {
    const [icon, setIcon] = useState('eye-off');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [password, setPassword] = useState('');

    const changeIcon = () => {
        if (icon == 'eye') {
            setIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (icon == 'eye-off') {
            setIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{ flex: 1 }}>
                <ImageBackground source={require('./assets/background.jpg')} style={{ flex: 1 }} >
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <View style={{ height: AdjustFontSize(115) }}></View>
                            <View style={{ flex: 1, }}>
                                <Text style={{ fontSize: AdjustFontSize(23), fontWeight: 'bold', color: '#311221', marginLeft: AdjustFontSize(20), marginBottom: 5 }}>{'Sign Up'}</Text>
                                <View style={{ width: '80%', alignSelf: 'center', marginTop: AdjustFontSize(40), }}>
                                    <View style={{ width: '100%', height: AdjustFontSize(40), borderRadius: 40, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 5 }}>
                                        <TextInput style={{ flex: 1, margin: 5, paddingHorizontal: 10, fontSize: AdjustFontSize(12), color: '#000' }}
                                            placeholder="Full Name"
                                            keyboardType="default"
                                        />
                                    </View>
                                    <View style={{ width: '100%', height: AdjustFontSize(40), borderRadius: 40, backgroundColor: '#fff', marginTop: AdjustFontSize(20), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 5 }}>
                                        <TextInput style={{ flex: 1, margin: 5, paddingHorizontal: 10, fontSize: AdjustFontSize(12), color: '#000' }}
                                            placeholder="Email"
                                            keyboardType="default"
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', width: '100%', height: AdjustFontSize(40), borderRadius: 40, backgroundColor: '#fff', marginTop: AdjustFontSize(20), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 5, flexDirection: 'row' }}>
                                        <TextInput style={{ flex: 1, margin: 5, paddingHorizontal: 10, fontSize: AdjustFontSize(12), color: '#000' }}
                                            placeholder="Password"
                                            keyboardType="default"
                                            secureTextEntry={passwordVisibility}
                                            value={password}
                                            onChangeText={(text) => setPassword(text)}
                                        />
                                        <Icon onPress={() => changeIcon()} name={icon} size={AdjustFontSize(20)} color={'#311221'} style={{ marginRight: 10 }} />
                                    </View>
                                    <TouchableOpacity style={{ width: '100%', height: AdjustFontSize(40), borderRadius: 40, backgroundColor: '#966AF8', marginTop: AdjustFontSize(20), justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.55, shadowRadius: 4, elevation: 5 }}>
                                        <Text style={{ fontSize: AdjustFontSize(12), color: '#fff', fontWeight: '500', alignSelf: 'center' }}>{'Sign Up'}</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '90%', alignSelf: 'center', marginTop: AdjustFontSize(30), flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#311221', height: 1, flex: 1, alignSelf: 'center' }} />
                                        <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: AdjustFontSize(11), color: '#311221', fontWeight: 'bold' }}>{'Or'}</Text>
                                        <View style={{ backgroundColor: '#311221', height: 1, flex: 1, alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: AdjustFontSize(30), alignSelf: 'center' }}>
                                        <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', marginRight: AdjustFontSize(10) }}>
                                            <Image source={require('./assets/google.png')} style={{ alignSelf: 'center', width: AdjustFontSize(20), height: AdjustFontSize(20), }} resizeMode='contain' />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', marginLeft: AdjustFontSize(10) }}>
                                            <Image source={require('./assets/facebook1.png')} style={{ alignSelf: 'center', width: AdjustFontSize(22), height: AdjustFontSize(22), }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ alignSelf: 'center', marginTop: AdjustFontSize(50), marginBottom: AdjustFontSize(10) }}>
                                    <Text style={{ fontSize: AdjustFontSize(12), alignSelf: 'center', color: '#311221', fontWeight: '500', }}>{`Already have an account?`}<Text onPress={() => navigation.goBack()} style={{ color: '#966AF8' }}>{' Sign In'}</Text></Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    )
}