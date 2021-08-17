import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class ListaAlunos extends Component 
{
  render(){
    return(
      <View style={{ margin: 5}}>
        <Text>ID: {this.props.id}</Text>
        <Text>Nome: {this.props.nome}</Text>
        <Text>Disciplina: {this.props.disciplina}</Text>


        {
            this.props.nota >= 6 ? <Text style={{ color: 'green' }}>Nota: {this.props.nota}</Text> 
            : <Text style={{ color: 'red' }}>Nota: {this.props.nota}</Text>
        }

        <TouchableOpacity onPress={ () => {this.props.deletar(this.props.id) } }  style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 30, backgroundColor: 'red' }}>
            <Text style={{color: 'white'}}>Remover</Text>
        </TouchableOpacity>

      </View>
    )
  }

}