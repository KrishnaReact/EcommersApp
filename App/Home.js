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
    FlatList,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdjustFontSize from "./components/AdjustFontSize";
import Header from "./components/Header";
import VirtualizedScrollView from "./components/VirtualizedScrollView";
import IonIcon from "react-native-vector-icons/Ionicons";
import SearchHeader from "./components/SearchHeader";
import { ImageSlider } from "react-native-image-slider-banner";
import { fetchAllCategories } from "./redux/allCategoriesSlicer";
import Loading from "./components/Loading";


export default function Home({ navigation }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [categoryPage, setCategoryPage] = useState(1);

    let dataCategories = useSelector((state) => state.categoriesReducerData.allCategoryData);
    let catData = useSelector((state) => state.categoriesReducerData.data);

    useEffect(() => {
        if (catData.length == 0) {
            dispatch(fetchAllCategories(categoryPage));
        }
    }, []);

    useEffect(() => {
        setCategoryPage(categoryPage + 1);
        if (catData.length == 100) {
            setLoading(true);
            dispatch(fetchAllCategories(categoryPage));
        } else if (catData.length < 100 && catData.length > 0) {
            setLoading(false);
            //console.log('xxxxxxx', dataCategories.length)

            var Catdata = dataCategories.map(function (item) {
                return {
                    id: item.id,
                    name: item.name,
                    parent: item.parent,
                    display: item.display,
                    //image:item.image,
                    expanded: false,
                };
            });

            //console.log('catdata>>>>>>>', Catdata)
        }
    }, [catData])

    const local_image = [
        {
            id: '1',
            name: 'MEN',
            image: require('./assets/man.png'),
        },
        {
            id: '2',
            name: 'WOMEN',
            image: require('./assets/women.png'),
        },
        {
            id: '3',
            name: 'KIDS',
            image: require('./assets/kid.png'),
        },
        {
            id: '4',
            name: 'FOOTWEAR',
            image: require('./assets/footwear.png'),
        },
        {
            id: '5',
            name: 'BAGS',
            image: require('./assets/bag.png'),
        },
        {
            id: '6',
            name: 'HOME DECOR',
            image: require('./assets/homedeco.png'),
        },
        // {
        //     id: '7',
        //     name: 'CATEGORIES',
        //     image: require('./assets/category.png'),
        // }
    ]
    const latest_arrivals = [
        {
            id: '1',
            name: 'Black Jeans',
            price: '99.00',
            imageurl: 'https://img.freepik.com/free-photo/handsome-man-wearing-sunglasses-standing-grey-wall_171337-14981.jpg?t=st=1713418084~exp=1713421684~hmac=a9de05ca05052f0f86537573817aeb2f04143e5ccbfe13c43152a9be113b6e47&w=826',
        },
        {
            id: '2',
            name: 'Red Dress',
            price: '120.00',
            imageurl: 'https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?t=st=1713417845~exp=1713421445~hmac=43f80f733fa18d595bb45ec159ff9c12dfe8525a9bb97e3c8ab4ca8f0a96c037&w=826',
        },
        {
            id: '3',
            name: 'Sweater & Skirt',
            price: '119.00',
            imageurl: 'https://img.freepik.com/free-photo/beautiful-woman-purple-sweater-skirt_1303-17492.jpg?t=st=1713417893~exp=1713421493~hmac=ec7a745a465ff4c29988f50d5a88df2bf6f05f3d1f88827c9e282e4d4009253f&w=826',
        },
        {
            id: '4',
            name: 'Denim Shirt & Trousers',
            price: '98.00',
            imageurl: 'https://img.freepik.com/free-photo/young-handsome-hipster-man-trendy-style-outfit-denim-shirt-trousers-sunglasses-hat-isolated-jumping-cheerful-pointing-finger_285396-1517.jpg?t=st=1713418156~exp=1713421756~hmac=e0b30af3d0ea160a43b8ae584a760c2773265b1c328b1d37b7e717bc0504d88c&w=826',
        },
        {
            id: '5',
            name: 'Girl Dress',
            price: '79.00',
            imageurl: 'https://img.freepik.com/free-photo/little-girl-cute-dress_1303-13476.jpg?t=st=1713418309~exp=1713421909~hmac=4f5b60c2313c6e1ef18e4457c98ba5d049af0024139148773f8415a7b5e0e2b9&w=826',
        }
    ]

    const best_sellers = [
        {
            id: '1',
            name: 'See Dress',
            price: '129.00',
            imageurl: 'https://img.freepik.com/free-photo/woman-with-glasses-see-dress-her-back_1187-1634.jpg?t=st=1713418050~exp=1713421650~hmac=4c1a10b24a7dd262ad8726c4d9b51cf86cf7ab9ecc16f8679a409d2a21dc9046&w=826',
        },
        {
            id: '2',
            name: 'Sundress',
            price: '109.00',
            imageurl: 'https://img.freepik.com/free-photo/woman-wearing-sundress_23-2150388811.jpg?t=st=1713418023~exp=1713421623~hmac=f7986fad4efd736707b8312b47ed80d65a03b087168a3c92929966f16eef3481&w=826',
        },
        {
            id: '3',
            name: 'Black Suit',
            price: '180.00',
            imageurl: 'https://img.freepik.com/free-photo/portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-black-suit_158538-11489.jpg?t=st=1713418254~exp=1713421854~hmac=0abae27ce4a15ffcdace68a161b3c3781b8663a976ec102efb1367a81a9756d3&w=826',
        },
        {
            id: '4',
            name: 'Blue Suit',
            price: '199.00',
            imageurl: 'https://img.freepik.com/free-photo/high-fashion-look-young-stylish-confident-happy-handsome-businessman-model-man-blue-suit-clothes-street-sunglasses-sky_158538-9486.jpg?t=st=1713418206~exp=1713421806~hmac=4e04e4ff8ba8ebfcac657f35b2045d7f4389a03884040dfa0da2309484b49329&w=826',
        },
        {
            id: '5',
            name: 'Pink Dress',
            price: '149.00',
            imageurl: 'https://img.freepik.com/free-photo/portrait-pretty-little-girl-pink-dress_158538-2075.jpg?t=st=1713418336~exp=1713421936~hmac=0d9db716f16ae4e0a431d7f28837fd916d8dd767a0c706e70cf37bd9fd99bdd7&w=826',
        },
        {
            id: '6',
            name: 'Boy Clothes',
            price: '179.00',
            imageurl: 'https://img.freepik.com/free-photo/pretty-young-boy-casual-clothes-white-studio_155003-32741.jpg?t=st=1713418434~exp=1713422034~hmac=0b6af120d5438ab27ec0774deefdb6c21ea4420aba2dc9e1d6397e7322b1dd95&w=826',
        }
    ]

    const men_product = [
        {
            id: '1',
            name: 'Black Jeans',
            price: '99.00',
            imageurl: 'https://img.freepik.com/free-photo/handsome-man-wearing-sunglasses-standing-grey-wall_171337-14981.jpg?t=st=1713418084~exp=1713421684~hmac=a9de05ca05052f0f86537573817aeb2f04143e5ccbfe13c43152a9be113b6e47&w=826',
        },
        {
            id: '2',
            name: 'Men Jeans',
            price: '110.00',
            imageurl: 'https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-wearing-jeans-clothes-sunglasses-fashion-man_158538-5023.jpg?t=st=1713418108~exp=1713421708~hmac=2782c6d7db8f2dad888e8873d9a821ab70ecbfb947b0c73886d01f8dc6c15f37&w=900',
        },
        {
            id: '3',
            name: 'Men Shirt',
            price: '79.00',
            imageurl: 'https://img.freepik.com/free-photo/serious-young-man-standing-isolated-grey_171337-10386.jpg?t=st=1713418133~exp=1713421733~hmac=81c28778bec8257c5426dcfa9741999d581ae701c734605a0934769b6b64eaff&w=826',
        },
        {
            id: '4',
            name: 'Denim Shirt & Trousers',
            price: '139.00',
            imageurl: 'https://img.freepik.com/free-photo/young-handsome-hipster-man-trendy-style-outfit-denim-shirt-trousers-sunglasses-hat-isolated-jumping-cheerful-pointing-finger_285396-1517.jpg?t=st=1713418156~exp=1713421756~hmac=e0b30af3d0ea160a43b8ae584a760c2773265b1c328b1d37b7e717bc0504d88c&w=826',
        },
        {
            id: '5',
            name: 'Blue Blazer',
            price: '119.00',
            imageurl: 'https://img.freepik.com/free-photo/full-length-portrait-handsome-serious-man_171337-17388.jpg?t=st=1713418184~exp=1713421784~hmac=4d1a0627aba3275b56630301beecea3a5b3595f2fd9f6647ea6f0a7143d1f1e2&w=826',
        },
        {
            id: '6',
            name: 'Blue Suit',
            price: '199.00',
            imageurl: 'https://img.freepik.com/free-photo/high-fashion-look-young-stylish-confident-happy-handsome-businessman-model-man-blue-suit-clothes-street-sunglasses-sky_158538-9486.jpg?t=st=1713418206~exp=1713421806~hmac=4e04e4ff8ba8ebfcac657f35b2045d7f4389a03884040dfa0da2309484b49329&w=826',
        },
        {
            id: '7',
            name: 'Men Suit',
            price: '199.00',
            imageurl: 'https://img.freepik.com/free-photo/groom-studio_1303-5842.jpg?t=st=1713418230~exp=1713421830~hmac=d2a74595eec566eb181bf0188e8673d3918e6dbd7c5841310b11615a41a18032&w=826',
        },
        {
            id: '8',
            name: 'Black Suit',
            price: '199.00',
            imageurl: 'https://img.freepik.com/free-photo/portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-black-suit_158538-11489.jpg?t=st=1713418254~exp=1713421854~hmac=0abae27ce4a15ffcdace68a161b3c3781b8663a976ec102efb1367a81a9756d3&w=826',
        }
    ]

    const women_product = [
        {
            id: '1',
            name: 'Women Red Dress',
            price: '99.00',
            imageurl: 'https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?t=st=1713417845~exp=1713421445~hmac=43f80f733fa18d595bb45ec159ff9c12dfe8525a9bb97e3c8ab4ca8f0a96c037&w=826',
        },
        {
            id: '2',
            name: 'Purple Sweater Skirt',
            price: '110.00',
            imageurl: 'https://img.freepik.com/free-photo/beautiful-woman-purple-sweater-skirt_1303-17492.jpg?t=st=1713417893~exp=1713421493~hmac=ec7a745a465ff4c29988f50d5a88df2bf6f05f3d1f88827c9e282e4d4009253f&w=826',
        },
        {
            id: '3',
            name: 'Green Dress',
            price: '79.00',
            imageurl: 'https://img.freepik.com/free-photo/still-life-spring-wardrobe-switch_23-2150479001.jpg?t=st=1713417921~exp=1713421521~hmac=76197c016089f539b870f6e6dc44705ca4db6d3eb6c7701469222027b04ac369&w=826',
        },
        {
            id: '4',
            name: 'Maroon Dress',
            price: '139.00',
            imageurl: 'https://img.freepik.com/free-photo/full-size-portrait-charming-asian-female-pretty-maroon-dress-posing-beige-background-with-brilliant-smile-hand-waist_171337-3565.jpg?t=st=1713417944~exp=1713421544~hmac=b36a5f4676dd28bafd3e130746ae6bff8673937b6ed13a77b17b582ba76569e1&w=826',
        },
        {
            id: '5',
            name: 'Yellow Dress',
            price: '119.00',
            imageurl: 'https://img.freepik.com/free-photo/young-woman-beautiful-yellow-dress_1303-17542.jpg?t=st=1713417970~exp=1713421570~hmac=baebe73c23cf25e5977c6531cea56ffbc503b748a8428652c864fccacb1e630d&w=826',
        },
        {
            id: '6',
            name: 'Women Dress',
            price: '199.00',
            imageurl: 'https://img.freepik.com/free-photo/woman-dress_1303-3763.jpg?t=st=1713418000~exp=1713421600~hmac=8835509b9075ce008aeda24a2931019bc32204d8caca012084079c5d2351639e&w=826',
        },
        {
            id: '7',
            name: 'Sundress',
            price: '199.00',
            imageurl: 'https://img.freepik.com/free-photo/woman-wearing-sundress_23-2150388811.jpg?t=st=1713418023~exp=1713421623~hmac=f7986fad4efd736707b8312b47ed80d65a03b087168a3c92929966f16eef3481&w=826',
        },
        {
            id: '8',
            name: 'See Dress',
            price: '199.00',
            imageurl: 'https://img.freepik.com/free-photo/woman-with-glasses-see-dress-her-back_1187-1634.jpg?t=st=1713418050~exp=1713421650~hmac=4c1a10b24a7dd262ad8726c4d9b51cf86cf7ab9ecc16f8679a409d2a21dc9046&w=826',
        }
    ]

    const kids_product = [
        {
            id: '1',
            name: 'Girl Dress',
            price: '99.00',
            imageurl: 'https://img.freepik.com/free-photo/little-girl-cute-dress_1303-13476.jpg?t=st=1713418309~exp=1713421909~hmac=4f5b60c2313c6e1ef18e4457c98ba5d049af0024139148773f8415a7b5e0e2b9&w=826',
        },
        {
            id: '2',
            name: 'Girl Pink Dress',
            price: '110.00',
            imageurl: 'https://img.freepik.com/free-photo/portrait-pretty-little-girl-pink-dress_158538-2075.jpg?t=st=1713418336~exp=1713421936~hmac=0d9db716f16ae4e0a431d7f28837fd916d8dd767a0c706e70cf37bd9fd99bdd7&w=826',
        },
        {
            id: '3',
            name: 'Girl Red Dress',
            price: '79.00',
            imageurl: 'https://img.freepik.com/free-photo/little-fashionista-with-shopping-bag-summer-hat-glasses-colored-pink-background-mom-s-shoes-concept-children-s-fashion_169016-4513.jpg?t=st=1713418355~exp=1713421955~hmac=872858c7b002c77ac26654d16af4269107f5594640c6bdea3fb2096d685d1f9b&w=826',
        },
        {
            id: '4',
            name: 'Boy Shirt & Jeans',
            price: '139.00',
            imageurl: 'https://img.freepik.com/free-photo/low-angle-little-boy-posing_23-2148445671.jpg?t=st=1713418382~exp=1713421982~hmac=aa8aad8318d34af366fc34ead9a747e0337fa546fd04807eaddbc44fe351f628&w=826',
        },
        {
            id: '5',
            name: 'Green Hoodie',
            price: '119.00',
            imageurl: 'https://img.freepik.com/free-photo/front-view-modern-boy-with-sunglasses-posing_23-2148423111.jpg?t=st=1713418401~exp=1713422001~hmac=cb678d80e056cf859e52e96e4f7d3f3e59f7c264cc27dab0816403e03f9138e9&w=826',
        },
        {
            id: '6',
            name: 'Boy White Dress',
            price: '109.00',
            imageurl: 'https://img.freepik.com/free-photo/pretty-young-boy-casual-clothes-white-studio_155003-32741.jpg?t=st=1713418434~exp=1713422034~hmac=0b6af120d5438ab27ec0774deefdb6c21ea4420aba2dc9e1d6397e7322b1dd95&w=826',
        },
    ]

    const navigateToProduct = (item) => {
        if (item.id == '1') {
            navigation.navigate('CategoriesProduct', { 'products': men_product })
        } else if (item.id == '2') {
            navigation.navigate('CategoriesProduct', { 'products': women_product })
        } else if (item.id == '3') {
            navigation.navigate('CategoriesProduct', { 'products': kids_product })
        }
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#DAC7ED'} ></Header>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{ flex: 1 }}>
                <SearchHeader navigation={navigation} />
                <VirtualizedScrollView>
                    <View style={{ flex: 1, marginHorizontal: 0 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ width: '100%', height: AdjustFontSize(90), backgroundColor: '#fff', flexDirection: 'row', marginTop: AdjustFontSize(10), alignItems: 'center', alignSelf: 'center', }}>
                                {local_image.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigateToProduct(item)} key={index} style={{ width: AdjustFontSize(80), marginRight: 5, }}>
                                            <Image source={item.image} style={{ width: AdjustFontSize(70), height: AdjustFontSize(70), borderRadius: 4, resizeMode: 'contain', alignSelf: 'center', }} />
                                            <Text style={{ fontSize: AdjustFontSize(9), color: '#000', alignSelf: 'center', textAlign: 'center' }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                                {/* <TouchableOpacity  style={{ width: AdjustFontSize(80), height:AdjustFontSize(80),marginRight: 5, justifyContent:'center'}}>
                                <Image source={require('./assets/category.png')} style={{ width: AdjustFontSize(50), height: AdjustFontSize(50), borderRadius: 4, resizeMode: 'contain', alignSelf: 'center',marginLeft:5 }} />
                                <Text style={{ fontSize: AdjustFontSize(9), color: '#000', alignSelf: 'center', textAlign: 'center',position:'absolute',bottom:0 }}>{'CATEGORIES'}</Text>
                            </TouchableOpacity> */}
                            </View>
                        </ScrollView>
                        <View style={{ width: '100%', height: AdjustFontSize(180), marginTop: AdjustFontSize(15) }}>
                            <ImageSlider
                                caroselImageStyle={{ resizeMode: 'contain', height: '100%', }}
                                activeIndicatorStyle={{ backgroundColor: '#000' }}
                                indicatorContainerStyle={{ bottom: -15 }}
                                data={[
                                    { img: require('./assets/ecom.png') },
                                    { img: require('./assets/ecom.png') },
                                    //{ img: 'https://kingscollection.co.ke/wp-content/uploads/2023/11/IMG_2640.png' },
                                ]}
                                autoPlay={true}
                                preview={false}
                                localImg
                            >
                            </ImageSlider>
                            <View style={{ width: '100%', height: AdjustFontSize(20), backgroundColor: 'rgba(0,0,0, 0.2)', position: 'absolute', bottom: 0, }}></View>
                        </View>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(20), justifyContent: 'center' }}>
                            <Text style={{ fontSize: AdjustFontSize(14), fontWeight: 'bold', color: '#000', alignSelf: 'center', textDecorationLine: 'underline' }}>{'LATEST ARRIVALS'}</Text>
                        </View>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(20), justifyContent: 'center' }}>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '500', color: '#966AF8', textDecorationLine: 'underline', position: 'absolute', right: 0, marginRight: AdjustFontSize(10) }}>{'View All'}</Text>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingHorizontal: AdjustFontSize(5), marginTop: AdjustFontSize(10) }}>
                                {latest_arrivals.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail',{Product:item})} key={index} style={{ width: AdjustFontSize(130), height: AdjustFontSize(200), backgroundColor: '#fff', borderRadius: 5, marginVertical: AdjustFontSize(10), marginHorizontal: AdjustFontSize(5), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 5, }}>
                                            <Image source={{ uri: item.imageurl }} style={{ width: '100%', height: AdjustFontSize(160), resizeMode: 'stretch', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                                            <View style={{ width: '100%', marginTop: 5 }}>
                                                <Text numberOfLines={1} style={{ fontSize: AdjustFontSize(11), fontWeight: '600', color: '#000', marginHorizontal: 5 }}>{item.name}</Text>
                                                <Text style={{ fontSize: AdjustFontSize(10), fontWeight: '400', color: '#000', marginHorizontal: 5, marginTop: 3 }}>{'$'+item.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(20), justifyContent: 'center' }}>
                            <Text style={{ fontSize: AdjustFontSize(14), fontWeight: 'bold', color: '#000', alignSelf: 'center', textDecorationLine: 'underline' }}>{'BEST SELLERS'}</Text>
                        </View>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(20), paddingHorizontal: AdjustFontSize(5) }}>
                            <FlatList
                                data={best_sellers}
                                numColumns={2}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail',{Product:item})} key={index} style={{ flex: 1, height: AdjustFontSize(200), backgroundColor: '#fff', borderRadius: 5, marginVertical: AdjustFontSize(10), marginHorizontal: AdjustFontSize(5), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 5, }}>
                                            <Image source={{ uri: item.imageurl }} style={{ width: '100%', height: AdjustFontSize(160), resizeMode: 'stretch', borderTopRightRadius: 5, borderTopLeftRadius: 5 }} />
                                            <View style={{ width: '100%', marginTop: 5 }}>
                                                <Text numberOfLines={1} style={{ fontSize: AdjustFontSize(11), fontWeight: '600', color: '#000', marginHorizontal: 5 }}>{item.name}</Text>
                                                <Text style={{ fontSize: AdjustFontSize(10), fontWeight: '400', color: '#000', marginHorizontal: 5, marginTop: 3 }}>{'$'+item.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AllProducts')} style={{ height: AdjustFontSize(30), justifyContent: 'center', alignSelf: 'center', borderRadius: 80, backgroundColor: '#966AF8', marginVertical: AdjustFontSize(20) }}>
                            <Text style={{ fontSize: AdjustFontSize(10), fontWeight: '400', alignSelf: 'center', color: '#fff', marginHorizontal: AdjustFontSize(15) }}>{'View More Products'}</Text>
                        </TouchableOpacity>
                    </View>
                </VirtualizedScrollView>
            </KeyboardAvoidingView>
            <Loading loading={loading} />
        </SafeAreaProvider>
    )
}