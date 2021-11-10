import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class ListaAlunos extends Component 
{
  getEstilo() {
    if(this.props.aprovado == 'Sim') {
      return { flex: 1,  borderRadius: 10, backgroundColor:'#00ff2a', padding: 10 }
    } else if (this.props.aprovado == 'Não') {
      return { flex: 1,  borderRadius: 10, backgroundColor:'#fa2f5f', padding: 10 } 
    } else {
      return { flex: 1,  borderRadius: 10, backgroundColor:'white', padding: 10 } 
    }
  }

  render(){
    return(
      <View style={{ margin: 5}}>
        <View style={this.getEstilo()}>
          <View style={{flex: 1}}>
            
            <Text>ID: {this.props.id}</Text>
            <Text>Nome: {this.props.nome}</Text>
            <Text>Disciplina: {this.props.disciplina}</Text>
            <Text>Aprovado: {this.props.aprovado}</Text>
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