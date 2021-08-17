import SQLite from "react-native-sqlite-storage"; 
SQLite.DEBUG(true); 
SQLite.enablePromise(true);

const database_name = "NotasAlunos.db"; 
const database_version = "1.0"; 
const database_displayname = "Notas Alunos";
const database_size = 200000;
                              
export default class Database 
{

    Conectar() 
    {  
        let db;
        return new Promise((resolve) => 
        {    
            console.log("Checando a integridade do plugin ...");    
        
            SQLite.echoTest().then(() => 
            {        
                console.log("Integridade Ok ...");        
                console.log("Abrindo Banco de Dados ...");        
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                        db = DB;            
                        console.log("Banco de dados Aberto");            
                        db.executeSql('SELECT 1 FROM Aluno LIMIT 1').then(() => {
                            console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                        }).catch((error) =>{
                            console.log("Erro Recebido: ", error);
                            console.log("O Banco de dados não está pronto ... Criando Dados");
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS Aluno (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(30), disciplina VARCHAR(30), nota DOUBLE)');
                            }).then(() => {
                                console.log("Tabela criada com Sucesso");                
                            }).catch(error => {                    
                                console.log(error);                
                            });            
                        });            
                    resolve(db);          
                }).catch(error => {           
                    console.log(error);          
                });      
            }).catch(error => {        
                console.log("echoTest Falhou - plugin não funcional");      
            });    
        }); 
    }

    Desconectar(db) {  
        if (db) {    
            console.log("Fechando Banco de Dados");    
            db.close().then(status => {        
                console.log("Banco de dados Desconectado!!");      
            }).catch(error => {        
                this.errorCB(error);      
            });  
        } else {    
            console.log("A conexão com o banco não está aberta");  
        } 
    };
         

    Listar() {  
        return new Promise((resolve) => {    
            const listaAlunos = [];    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Aluno', []).then(([tx,results]) => {          
                    console.log("Consulta completa");          
                    var len = results.rows.length;          
                    for (let i = 0; i < len; i++) {            
                        let row = results.rows.item(i);            
                        const { id, nome, disciplina, nota } = row;
                        listaAlunos.push({id,nome,disciplina,nota});
                    }
                    resolve(listaAlunos);
                });
            }).then((result) => {
                this.Desconectar(db);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });
    }
              

    Inserir(aluno) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Aluno(nome, disciplina, nota) VALUES (?, ?, ?)', [aluno.nome, aluno.disciplina, aluno.nota]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    Atualizar(aluno) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE Aluno SET nome = ?, disciplina = ?, nota = ? WHERE id = ?', [aluno.nome, aluno.disciplina, aluno.nota, aluno.id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }

    Deletar(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {    
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM Aluno WHERE id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

}