import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config'
import firebase from 'firebase';
export default class Transaction extends React.Component{
   constructor(){
       super()
       this.state={
           hascamerapermissions:null,
           scanned:false,
           scanneddata:"",
           buttonState:"normal",
           studentID:"",
           bookID:""
       }
   }
   getcamerapermissions=async(id)=>{
     const {status}=await Permissions.askAsync(Permissions.CAMERA)
     this.setState({
         hascamerapermissions:status==="granted",
         buttonState:id,
         scanned:false
     })   
   }
   handlebarcodescaned=async({type,data})=>{
       const {buttonState}=this.state
       if (buttonState==="studentid"){
      this.setState({
          scanned:true,
          studentID:data,
          buttonState:"normal"
      })
    }
    else if (buttonState==="bookid"){
        this.setState({
            scanned:true,
            bookID:data,
            buttonState:"normal"
        })
    }
   }

   bookIssue=()=>{
      db.collection("transaction").add({
          studentid:this.state.studentID,
          bookid:this.state.bookID,
          transactiontype:"issue"
      })


   }

    render(){
        const hascamerapermissions=this.state.hascamerapermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState!=="normal"&& hascamerapermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned? undefined : this.handlebarcodescaned}
                style={StyleSheet.absoluteFillObject}/>
            )
        }
        else if (buttonState==="normal"){

        
        return(
            <View>
                <View style={{marginTop:50, marginLeft:100}}>
                <Text>{hascamerapermissions===true? this.state.scanneddata:"requestPermission"}</Text>
                </View>
            <TextInput style={{width:200, height:30, marginTop:50, alignSelf:"center", borderWidth:3}}
            value={this.state.studentID}
            />
            <TextInput style={{width:200, height:30, marginTop:50, alignSelf:"center", borderWidth:3}}
            value={this.state.bookID} />
               
                <TouchableOpacity style ={{ backgroundColor:"purple", marginTop:50, justifyContent:"center", width:200, height:30, alignSelf:'center'}}
                onPress={()=>{this.getcamerapermissions("studentid")}}>
                         
                    <Text>studentID</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor:"blue", marginTop:50, justifyContent:"center",
                width:200, height:30, alignSelf:"center"}}
                onPress={()=>{this.getcamerapermissions("bookid")}}>
                    <Text>bookID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"purple", marginTop:50, justifyContent:"center" , width:200, height:30,
            alignSelf:"center"}}
            onPress={()=>{
                this.bookIssue()
            }}
            >
                    <Text>Issue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:"purple", marginTop:50, justifyContent:"center",
                width:200, height:30, alignContent:"center", alignSelf:"center"}}>
                    <Text>Return</Text>
                </TouchableOpacity>

            </View>
        )
        }
        
    }

}