import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Drawer} from './Components'
import {useDispatch} from 'react-redux'
import {setHide} from './slices/drawerSlice'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default () => {

    const dispatch = useDispatch()
    
    return( 
        <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#152044'}}/>
            <View style={styles.container}>
                <View style={{height: 55, alignSelf: 'stretch', backgroundColor: '#1B2B5D', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>

                    <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>Projects</Text>
                    <TouchableOpacity
                        onPress={() => dispatch(setHide(Math.random().toString()))}
                        style={{height: '100%', width: 55, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, zIndex: 20}}>
                        <Material name={'menu'} size={20} color={'#fff'}/>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        source={{uri: 'https://i.ibb.co/5jLxFsz/error.png'}}
                        style={{height: 200, width: 200}}
                        resizeMode={'contain'}
                    />
                    <Text style={{fontSize: 16, color: '#152044', fontWeight: 'bold'}}>Your projects will appear here.</Text>
                </View>
                <Drawer />
            </View>
            <SafeAreaView style={{flex: 0, backgroundColor: '#152044'}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})