import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import Database from './src/Database/Database'
import ListaAlunos from './src/Componentes/ListaAlunos'
import Aluno from './src/Models/Aluno'

export default class App extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      nota: 0,
      listaAlunos: []
    }    
    this.ListarAlunos()
  }


  ListarAlunos = () => {
    const banco = new Database();
    banco.Listar().then( lista => { this.setState({listaAlunos : lista}) } )
  }

  CadastrarAluno = (nome, nota) => {
    const novoAluno = new Aluno(nome, nota, "???")
    const banco = new Database();
    banco.Inserir(novoAluno);
    this.ListarAlunos()
  }

  AprovarAluno = (id) => {
    const banco = new Database();
    banco.Aprovar(id);
    this.ListarAlunos()
    //DevSettings.reload();
  }

  ReprovarAluno = (id) => {
    const banco = new Database();
    banco.Reprovar(id);
    this.ListarAlunos()
  }  

  DeletarAluno = (id) => {
    const banco = new Database();
    banco.Deletar(id);
    this.ListarAlunos()
  }    

  render()
  {
    return(
      <ScrollView>
        <View>
          <Text style={estilo.titulo}>Cadastro de alunos </Text>

          <TextInput placeholder='Digite o nome do aluno...' onChangeText={(valor) => {this.setState({ nome : valor })}} />
          <TextInput placeholder='Digite a nota do aluno... ' onChangeText={(valor) => {this.setState({ nota : valor })}} />
          <TouchableOpacity style={estilo.botao} onPress={ ()=> { this.CadastrarAluno(this.state.nome, this.state.nota) }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Salvar</Text>
          </TouchableOpacity>
        </View>
        <Text style={estilo.titulo}>Lista de Alunos</Text>
        <Text></Text>
        {
          this.state.listaAlunos.map( item => (
          <ListaAlunos 
            key={item.id} 
            id={item.id} 
            nome={item.nome} 
            nota={item.nota} 
            aprovado={item.aprovado} 
            aprovar={this.AprovarAluno}
            reprovar={this.ReprovarAluno}
            deletar={this.DeletarAluno}
          />))
        }
      </ScrollView>
    )
  }

}

const estilo = StyleSheet.create({
  titulo: {
    fontSize: 18,
    margin: 5,
    color: 'black'
  },
  botao: {
    width: 150,
    backgroundColor: '#39bf00',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    
    margin: 5,
    color: 'white'
  },
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  linha1: {

  }
})