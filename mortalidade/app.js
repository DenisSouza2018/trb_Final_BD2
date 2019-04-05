const request = require('request');
var bd = require("./conectaBanco");
//var apicache  = require('apicache');
//var cache     = apicache.middleware;
 

bd.connect();

    const url1 = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados';
    const url2 = 'http://api.pgi.gov.br/api/1/serie/565152.json';

    

    request.get(url1, { json: true }, (err, res, body) => {
        if (err){
            console.error("Ocorreu um erro ao inserir no BD: " + err);
            return false;
        }
    
        const dadosAPI =body;
        
        console.log(body);
        console.log(body);
        /** 
        let vals1 = [];
        let vals2 = [];
        let vals3 = [];
        let vals4 = [];
        let vals5 = [];

        for (const obito of dadosAPI) {
           
            if(obito.regiao.nome == 'Norte'){
                const val = [obito.id, obito.sigla, obito.nome];
                vals1.push(val);
            }
            
            if(obito.regiao.nome == 'Nordeste'){
                const val = [obito.id, obito.sigla, obito.nome];
                vals2.push(val);
            }

            if(obito.regiao.nome == 'Sudeste'){
                const val = [obito.id, obito.sigla, obito.nome];
                vals3.push(val);
            }

            if(obito.regiao.nome == 'Sul'){
                const val = [obito.id, obito.sigla, obito.nome];
                vals4.push(val);
            }

            if(obito.regiao.nome == 'Centro-Oeste'){
                const val = [obito.id, obito.sigla, obito.nome];
                vals5.push(val);
            }

        }

        
         
        let sql1 = "INSERT INTO tb_localidade_norte (est_id, sigla, nome_est) VALUES ?";
        bd.query(sql1, [vals1], 
        function(err, result, fields){
            if (err){
                console.error("Ocorreu um erro ao inserir no BD: " + err);
                return false;
            }
            
            console.log("Os registros foram inseridos com sucesso Tabela Norte!");
            
        });

        let sql2 = "INSERT INTO tb_localidade_nordeste (est_id, sigla, nome_est) VALUES ?";
        bd.query(sql2, [vals2], 
            function(err, result, fields){
                if (err){
                    console.error("Ocorreu um erro ao inserir no BD: " + err);
                    return false;
                }
                
                console.log("Os registros foram inseridos com sucesso Tabela Nordeste!");
                
            });

        let sql3 = "INSERT INTO tb_localidade_sudeste (est_id, sigla, nome_est) VALUES ?";
        bd.query(sql3, [vals3], 
            function(err, result, fields){
                if (err){
                    console.error("Ocorreu um erro ao inserir no BD: " + err);
                    return false;
                }
                
                console.log("Os registros foram inseridos com sucesso Tabela Sudeste!");
                
            });
        let sql4 = "INSERT INTO tb_localidade_sul (est_id, sigla, nome_est) VALUES ?";
        bd.query(sql4, [vals4], 
            function(err, result, fields){
                if (err){
                    console.error("Ocorreu um erro ao inserir no BD: " + err);
                    return false;
                }
                
                console.log("Os registros foram inseridos com sucesso Tabela Sul!");
                
            });
        let sql5 = "INSERT INTO tb_localidade_centroOeste (est_id, sigla, nome_est) VALUES ?";
        bd.query(sql5, [vals5], 
            function(err, result, fields){
                if (err){
                    console.error("Ocorreu um erro ao inserir no BD: " + err);
                    return false;
                }
                
                console.log("Os registros foram inseridos com sucesso Tabela Centro-Oeste!");
                bd.end();
            });
        */
    });

    
    request.get(url2, function(error, response, body){
            if (error){
                console.error("Erro! " + error);
                return false;
            }
        
            const dadosAPI = JSON.parse(body);
            const obitosPorEstado = dadosAPI.valores;

            let vals = [];

            for (const obito of obitosPorEstado) {
                const val = [obito.estado_ibge, obito.mes, obito.ano, obito.valor];
                vals.push(val);
            }
        
            let sql = "INSERT INTO tb_mortalidade (est_id, mes, ano, quantidade) VALUES ?";
            bd.query(sql, [vals], 
            function(err, result, fields){
                if (err){
                    console.error("Ocorreu um erro ao inserir no BD: " + err);
                    return false;
                }
                
                console.log("Os registros foram inseridos com sucesso Tabela Mortalidade!");
                bd.end();
            });
        
});   

/************ Codigo para carregar a tabela localidade *******  
  * request.get(url1, { json: true }, (err, res, body) => {
        if (err){
            console.error("Ocorreu um erro ao inserir no BD: " + err);
            return false;
        }
    
        const dadosAPI =body;
  
   
        let vals = [];
        
        for (const obito of dadosAPI) {
            const val = [obito.id, obito.nome,obito.regiao.nome, obito.sigla];
            vals.push(val);     
        }

        let sql = "INSERT INTO tb_localidade (est_id, nome_est, regiao, sigla) VALUES ?";
        bd.query(sql, [vals], 
        function(err, result, fields){
            if (err){
                console.error("Ocorreu um erro ao inserir no BD: " + err);
                return false;
            }
            

            console.log("Os registros foram inseridos com sucesso!");
            
        });
          
    });

 * 
 */