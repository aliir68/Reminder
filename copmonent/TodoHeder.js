import React from 'react'
import { StyleSheet, View, Text,Pressable } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const TodoHeder = (props) =>{
    return(
        <View style={styles.container}>
            <Pressable style={{marginLeft : 25}} onPress={()=> props.navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={25} color="#603fab"/>
            </Pressable>
            <Text style={styles.headerText}>Add Todo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        backgroundColor : "#170829"
    
    },
    headerText:{
        fontSize : 18,
        fontWeight : "bold",
        marginRight : 25,
        color : "#ffffff",


    }
})
export { TodoHeder }