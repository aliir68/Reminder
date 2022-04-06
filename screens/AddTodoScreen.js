import React from 'react';
import {View ,Text ,StyleSheet} from 'react-native'
import {TodoHeder,TodoContent} from "../copmonent"
const AddTodoScreen = (props)=>{
    return(
        <View style={{flex : 1,backgroundColor : "#fff"}}>
            <TodoHeder {...props}/>
            <TodoContent {...props}/>

        </View>
    )
}

export {AddTodoScreen}