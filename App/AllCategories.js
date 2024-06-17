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
    UIManager,
    LayoutAnimation,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ArrowIcon from "react-native-vector-icons/Octicons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdjustFontSize from "./components/AdjustFontSize";
import Header from "./components/Header";
import SearchHeader from "./components/SearchHeader";
import VirtualizedScrollView from "./components/VirtualizedScrollView";
import IonIcon from "react-native-vector-icons/Ionicons";
import Loading from "./components/Loading";
import LinearGradient from 'react-native-linear-gradient';

const { convert } = require('html-to-text');
const options = {
    wordwrap: 130,
};

export default function AllCategories({ navigation }) {

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    //const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [categoryPage, setCategoryPage] = useState(1);
    let colors = [['#FAE6F4', '#F2B1DA'], ['#FEFAE1', '#E8E7B5'], ['#F0F3FA', '#B9CDF6'], ['#FDF8E2', '#F1D894'], ['#FAE7E1', '#F5D3C9']];

    let dataCategories = useSelector((state) => state.categoriesReducerData.allCategoryData);


    useEffect(() => {
        //getAllCategories();
        var Catdata = dataCategories.map(function (item) {
            return {
                id: item.id,
                name: item.name,
                parent: item.parent,
                display: item.display,
                // image:item.image,
                expanded: false,

            };
        });
        const catAllDATA = [];

        for (let key of Catdata) {

            if (key.parent === 0) {
                let new_key = key,
                    subCat = []

                for (let iterator of Catdata)
                    if (iterator.parent === key.id)
                        subCat.push(iterator)
                //subCat.push(key)
                new_key.subCat = subCat
                // console.log('aaaaaaa', new_key);
                catAllDATA.push(new_key)
            }
        }
        catAllDATA.map((item, index) => {
            if (item.name == 'Uncategorized') {
                catAllDATA.splice(index, 1)
            } else if (item.name == 'Promotional Items') {
                catAllDATA.splice(index, 1)
            }
        })
        setData(catAllDATA);
    }, [dataCategories]);



    const getAllCategories = async () => {
        //  
        try {
            const response = await fetch(`https://shop-fantastic.com/wp-json/wc/v3/products/categories?orderby=id&order=asc&per_page=100&page=${categoryPage}&consumer_key=ck_55c33488b8ee6ef77d12e45711c9bcfc85349f2a&consumer_secret=cs_4b2990e7b62b7b312a5c3737a19a694417468a42`);
            const json = await response.json();

            // console.log('Cat Data>>>>>>', json);

            //setLoading(false);
            // console.log('xxxx', catAllDATA[0].subCat[2].name);
        } catch (error) {
            // console.error(error);
        }
        // setLoading(false);
    }


    const changeLayout = (item, index) => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...data];
        array[index]['expanded'] = !array[index]['expanded'];
        setData(array);
        console.log('item>>>>>>>>', item)
        // setvisible(true);
    };

    const navigateToCategoriesProduct = (item) => {
        //navigation.navigate('CategoriesProduct', { categoryId: item.id })
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Header backgroundColor={'#DAC7ED'} ></Header>
            <SearchHeader navigation={navigation} />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
                    {data == [] ? <View></View> :
                        data.sort(function (a, b) {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                            return 0;
                        }).map((item, index) => (
                            <View style={{ marginBottom: 0, }} key={index}>
                                <TouchableOpacity style={{
                                    height: AdjustFontSize(100),
                                    //flexDirection: 'row',
                                    //justifyContent: 'space-between',
                                    //alignItems: 'center',
                                    //backgroundColor: (index % 2 == 0) ? '#E7ECEC' : '#fff'
                                }}
                                    onPress={() => item.subCat.length == 0 ? navigateToCategoriesProduct(item) : changeLayout(item, index)}
                                //onPress={() => changeLayout(item, index)}
                                >
                                    <LinearGradient start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={colors[index % colors.length]}
                                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                    >
                                        <Text style={styles.category_Text}>{convert(item.name, options)} </Text>
                                        <View style={{ width: 20, height: 20, justifyContent: 'center', marginRight: 10, }}>
                                            {item?.expanded == false ?
                                                <ArrowIcon
                                                    name={'chevron-down'}
                                                    size={20}
                                                    style={styles.iconStyle} />
                                                :
                                                <ArrowIcon
                                                    name={'chevron-up'}
                                                    size={20}
                                                    style={styles.iconStyle} />}
                                        </View>
                                        <Image source={item.name == 'Kids' ? require('./assets/kid_trans.png')
                                            : item.name == 'Men' ? require('./assets/man_trans.png')
                                                : item.name == 'Ladies' ? require('./assets/women_trans.png')
                                                    : item.name == 'Bags' ? require('./assets/bag_trans.png')
                                                        : item.name == 'Sports Wear' ? require('./assets/sports_wear_trans.png')
                                                            : item.name == 'Headgear' ? require('./assets/hats_trans.png')
                                                                : item.name == 'Camping &amp; Outdoor' ? require('./assets/camping_trans.png')
                                                                    : item.name == 'Household' ? require('./assets/household_trans.png')
                                                                        : item.name == 'Others' ? require('./assets/others_trans.png')
                                                                            : item.name == 'Safety Gear' ? require('./assets/safetygear_trans.png')
                                                                                : item.name == 'Swim Gear' ? require('./assets/swimgear_trans.png')
                                                                                    : null}
                                            style={{ height: AdjustFontSize(80), width: AdjustFontSize(100), position: 'absolute', right: 0, bottom: 0, marginRight: AdjustFontSize(10), marginBottom: 3, resizeMode: 'contain' }} />
                                    </LinearGradient>
                                </TouchableOpacity>

                                {item?.expanded == true ? <View>
                                    {item.subCat.sort(function (a, b) {
                                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                                        return 0;
                                    }).map((item, index) => (
                                        <View key={index}>
                                            <TouchableOpacity>
                                                <View style={{ height: AdjustFontSize(42), justifyContent: 'center', backgroundColor: (index % 2 == 0) ? '#faf9fd' : '#fff' }}>
                                                    <Text style={{ fontSize: AdjustFontSize(13), padding: 10, color: '#8d8d8d' }}>{convert(item.name, options)}</Text>
                                                </View>
                                                {/* <View style={{ width: '100%', height: .5, backgroundColor: '#c5c5c5', alignSelf: 'flex-end' }} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View> : null
                                }
                            </View>
                        )
                        )
                    }
                </ScrollView>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({

    iconStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        color: '#c5c5c5',
        textAlign: 'center'
    },
    category_Text: {
        textAlign: 'left',
        color: '#000',
        fontSize: AdjustFontSize(14),
        padding: 10,
        fontWeight: '600',
    },
});
