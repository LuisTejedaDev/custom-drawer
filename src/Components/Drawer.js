

import {Animated, Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import {x_40, x_40_minus} from '../constants'
import {useDrawer} from '../hooks'

export default () => {

    const {
        direction,
        translate,
        handlers,
        animatedBackground,
        animatedLineWidth,
        animatedTranslate,
        animatedContentWidth
    } = useDrawer()

    const animatedOpacity = {
        opacity: translate.x.interpolate({
            inputRange: [(direction === -1) ? -200 : 0, (direction === -1) ? 0 : 200],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
    }

    const animatedTopTranslate = {
        transform: [
            {
                translateY: translate.x.interpolate({
                    inputRange: [(direction === -1) ? -200 : 0, (direction === -1) ? 0 : 200],
                    outputRange: [0, -75],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    const animatedBottomTranslate = {
        transform: [
            {
                translateY: translate.x.interpolate({
                    inputRange: [(direction === -1) ? -200 : 0, (direction === -1) ? 0 : 200],
                    outputRange: [0, 75],
                    extrapolate: 'clamp'
                })
            }
        ]
    }
    
    const browse = [
        {
            id: 1,
            title: 'Home',
            screen: 'Home',
            icon: 'https://i.ibb.co/PMWVHgq/home.png',
            section: 1,
        },
        {
            id: 2,
            title: 'Search',
            screen: 'Search',
            icon: 'https://i.ibb.co/djP9QzS/search.png',
            section: 1,
        },
        {
            id: 3,
            title: 'Favorite',
            screen: 'Favorite',
            icon: 'https://i.ibb.co/JxG1wjn/heart.png',
            section: 1,
        },
        {
            id: 4,
            title: 'Help',
            screen: 'Help',
            icon: 'https://i.ibb.co/vqyKkWh/chat.png',
            section: 1,
        },
        {
            id: 5,
            title: 'History',
            screen: 'History',
            icon: 'https://i.ibb.co/BGVx5S3/history.png',
            section: 2,
        },
        {
            id: 6,
            title: 'Notifications',
            screen: 'Notifications',
            icon: 'https://i.ibb.co/56c533S/notification.png',
            section: 2,
        },
    ]

    const animatedImage = {
        transform: [
            {
                scale: translate.x.interpolate({
                    inputRange: [(direction === -1) ? -200 : 0, (direction === -1) ? 0 : 200],
                    outputRange: [1, 0],
                    extrapolate: 'clamp'
                })
            },
            {
                rotate: translate.x.interpolate({
                    inputRange: [(direction === -1) ? x_40_minus : 0, (direction === -1) ? 0 : x_40],
                    outputRange: ['0deg', '45deg'],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    return(
        <>
            {/* Color de fondo */}
            <Animated.View
                pointerEvents={(direction === -1) ? 'none' : 'auto'}
                style={[
                    styles.backGroundContainer,
                    animatedBackground
                ]} 
            />

            {/* Este es la linea que se desplaza */}
            <Animated.View
                style={[
                    {
                        height: '100%',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        right: 0,
                        zIndex: 100
                    },
                    animatedLineWidth,
                    animatedTranslate
                ]}
                {...handlers}
            />

            {/* El contenido del drawer */}
            <Animated.View
                style={[
                    {
                        height: '100%',
                        backgroundColor: '#1B2B5D',
                        position: 'absolute',
                        right: 0,
                        zIndex: 100,
                        borderTopStartRadius: 50,
                        borderBottomStartRadius: 50,
                        overflow: 'hidden'
                    },
                    animatedContentWidth
                ]}
            >
                <View style={{height: 300, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.View style={[{marginBottom: 15}, animatedImage]}>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO16DUlMKNPbQjZpZWSE4LPsbvbq5OEGKDxQ&usqp=CAU' }}
                            style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 200, borderWidth: 3, borderColor: '#fff' }}
                            resizeMode={'contain'}
                        />
                    </Animated.View>
                    <Animated.View style={[{height: 'auto', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}, animatedTopTranslate, animatedOpacity]}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Steve Jobs</Text>
                        <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)'}}>Empresario y Diseñador</Text>
                    </Animated.View>
                </View>
                <View style={{flex: 1, alignSelf: 'stretch'}}>
                    <ScrollView
                        style={{height: 'auto', alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 15}}
                    >
                        <Animated.View style={animatedOpacity}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', marginBottom: 15}}>BROWSE</Text>
                            <View style={{height: 2, alignSelf: 'stretch', backgroundColor: 'rgba(255,255,255,0.1)'}} />
                        </Animated.View>
                        {
                            browse.map(x => 
                                x.section === 1
                                &&
                                    <Animated.View
                                        key={x.id}
                                        style={[styles.item, animatedOpacity, animatedBottomTranslate]}
                                    >
                                        <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image
                                                source={{uri: x.icon}}
                                                style={{ width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                        <View style={{height: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                            <Text style={{fontSize: 15, color: '#fff', fontWeight: '500'}}>{x.title}</Text>
                                        </View>
                                    </Animated.View>    
                            )
                        }
                        <Animated.View style={animatedOpacity}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', marginBottom: 15}}>HISTORY</Text>
                            <View style={{height: 2, alignSelf: 'stretch', backgroundColor: 'rgba(255,255,255,0.1)'}} />
                        </Animated.View>
                        {
                            browse.map(x => 
                                x.section === 2
                                &&
                                    <Animated.View
                                        key={x.id}
                                        style={[styles.item, animatedOpacity, animatedBottomTranslate]}
                                    >
                                        <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image
                                                source={{uri: x.icon}}
                                                style={{ width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                        <View style={{height: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                            <Text style={{fontSize: 15, color: '#fff', fontWeight: '500'}}>{x.title}</Text>
                                        </View>
                                    </Animated.View>    
                            )
                        }
                        <View style={{height: 15}}/>
                    </ScrollView>
                </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    backGroundContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        height: 50,
        alignSelf: 'stretch',
        backgroundColor: '#1B2B5D',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 15,
        borderRadius: 4,
        flexDirection: 'row'
    }
})