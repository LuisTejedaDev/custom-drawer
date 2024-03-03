import {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder} from 'react-native';
import {x_40_minus, x_40, x_80_minus, x_80, x_25} from '../constants'
import {selectHide} from '../slices/drawerSlice';
import {useSelector} from 'react-redux';

export default () => {
    const hide = useSelector(selectHide)

    const [direction, setDirection] = useState(1) 

    const translate = useRef(new Animated.ValueXY(0)).current

    const handleHide = () => {
        setDirection((direction === -1) ? 1 : -1)
        Animated.timing(translate, {
            toValue: ({x: (direction === -1) ? x_80_minus : x_80, y: 0}),
            duration: 700,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        handleHide()
    }, [hide])

    const animatedBackground = {
        backgroundColor: translate.x.interpolate({
            inputRange: [(direction === -1) ? x_40_minus : 0, (direction === -1) ? 0 : x_40],
            outputRange: ['rgba(0,0,0,0.35)', 'rgba(0,0,0,0)'],
            extrapolate: 'clamp'
        })
    }

    const animatedLineWidth = {
        width: translate.x.interpolate({
            inputRange: [(direction === -1) ? x_40_minus : 0, (direction === -1) ? 0 : x_40],
            outputRange: [x_25, 10],
            extrapolate: 'clamp'
        })
    }

    const animatedTranslate = {
        transform: [
            {
                translateX: translate.x.interpolate({
                    inputRange: [
                        (direction === -1) 
                        ? x_40_minus
                        : 0
                    ,
                        (direction === -1)
                        ? 0
                        : x_40
                    ],
                    outputRange: [x_80_minus, 0],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    const animatedContentWidth = {
        width: translate.x.interpolate({
            inputRange: [(direction === -1) ? -250 : 0, (direction === -1) ? 0 : 250],
            outputRange: [x_80, 0],
            extrapolate: 'clamp'
        })
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {true},

        onPanResponderMove: Animated.event([
            null,
            {
                dx: translate.x,
                dy: translate.y
            }
        ],{useNativeDriver: false}),
        
        onPanResponderRelease: (e, {dx, dy, vx, vy}) => {
            if(dx < x_40_minus){
                Animated.timing(translate, {
                    toValue: ({x: x_80_minus, y: 0}),
                    duration: 700,
                    useNativeDriver: false
                }).start(() => {
                    setDirection(1)
                    translate.setValue({x: x_80_minus, y: 0})
                })

            } else if(dx > x_40){
                Animated.timing(translate, {
                    toValue: ({x: x_80, y: 0}),
                    duration: 700,
                    useNativeDriver: false
                }).start(() => {
                    setDirection(-1)
                    translate.setValue({x: x_80, y: 0})
                })
            } else {
                Animated.timing(translate, {
                    toValue: ({x: 0, y: 0}),
                    duration: 700,
                    useNativeDriver: false
                }).start()
            }
        }
    })

    return {
        direction: direction,
        translate: translate,
        handlers: panResponder.panHandlers,
        animatedBackground: animatedBackground,
        animatedLineWidth: animatedLineWidth,
        animatedTranslate: animatedTranslate,
        animatedContentWidth: animatedContentWidth,
    }
}