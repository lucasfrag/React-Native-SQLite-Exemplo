import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, DevSettings } from 'react-native'

import Database from './src/Database/Database'
import ItemAluno from './src/Components/ItemAluno'
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
    const novoAluno = new Aluno(nome, nota, null)
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
    //DevSettings.reload();
  }  

  DeletarAluno = (id) => {
    const banco = new Database();
    banco.Deletar(id);
    this.ListarAlunos()
    //DevSettings.reload();
  }    

  render()
  {
    return(
      <ScrollView>
        <Text style={{ fontSize: 20 }}>Cadastro de alunos </Text>

        <TextInput placeholder='Nome' onChangeText={(valor) => {this.setState({ nome : valor })}} />
        <TextInput placeholder='Nota' onChangeText={(valor) => {this.setState({ nota : valor })}} />
        <Button title="Cadastrar" onPress={ ()=> { this.CadastrarAluno(this.state.nome, this.state.nota) }} />

        <Text>Lista de Alunos</Text>
        <Text></Text>
        {
          this.state.listaAlunos.map( item => (
          <ItemAluno 
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