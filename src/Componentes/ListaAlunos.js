import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class ListaAlunos extends Component 
{
  getEstilo() {
    if(this.props.aprovado == 'Sim') {
      return { color:'#39bf00', fontWeight: 'bold' }
    } else if (this.props.aprovado == 'Não') {
      return { color:'#fa2f5f', fontWeight: 'bold' } 
    } else {
      return { color:'black' } 
    }
  }

  render(){
    return(
      <View style={{ margin: 5}}>
        <View style={{flex: 1,  borderRadius: 10, backgroundColor:'white', padding: 10}}>
          <View style={{flex: 1}}>
            
            <Text>ID: {this.props.id}</Text>
            <Text>Nome: {this.props.nome}</Text>
            <Text>Disciplina: {this.props.disciplina}</Text>
            <Text>Aprovado: <Text style={this.getEstilo()}>{this.props.aprovado}</Text></Text>
            <Text>Nota: {this.props.nota}</Text>
            
          </View>

        <Text></Text>
        
        <View style={{flex: 1, flexDirection: 'row',}}>
          
          <TouchableOpacity 
            onPress={ () => {this.props.aprovar(this.props.id) } }  
            style={{ 
              flex: 1, 
              flexDirection: 'row', 
              margin: 5, 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 100, 
              height: 30, 
              backgroundColor: '#39bf00' 
            }}>
              <Text style={{color: 'white'}}>APROVAR!</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={ () => {this.props.reprovar(this.props.id) } }  
            style={{ 
              flex: 1, 
              flexDirection: 'row', 
              margin: 5, alignItems: 'center', 
              justifyContent: 'center', 
              width: 100, height: 30, 
              backgroundColor: '#db5a04' 
            }}>
              <Text style={{color: 'white'}}>REPROVAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => {this.props.deletar(this.props.id) } }  style={{ 
            flex: 1, 
            flexDirection: 'row', 
            margin: 5, 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: 100, 
            height: 30, 
            backgroundColor: 'red' 
            }}>
              <Text style={{color: 'white'}}>REMOVER</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

}