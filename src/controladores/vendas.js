const bancodedados = require ('../bancodedados')
const fs = require ('fs/promises');




function teste (req, res){
    res.status(200).json("Tudo ok!")
}

async function exibirProdutos (req, res) {
    res.status(200).json(bancodedados);
}

async function vendas (req, res){
    const {produto_id, quantidade} = req.body;
    const idNumber = Number(produto_id);
    const qtd = Number(quantidade);
    

    const acharProduto = bancodedados.find((produto) => {
        return idNumber === produto.id
    });

    if (!acharProduto){
        return res.status(404).json({mensagem: 'Produto não encontrado'})
    };

    if (qtd <= 0 ){
        return res.status(400).json({mensagem: 'Quantidade de produtos inválida'})
    };

    try {
        const vendas = await fs.readFile('./src/vendas.json');

        const parseVendas = JSON.parse(vendas);

        parseVendas.vendas.push (
            {
                produto: acharProduto,
                quantidade: qtd
            }
        )

        const vendasStringFy = JSON.stringify(parseVendas);

        await fs.writeFile ('./src/vendas.json', vendasStringFy);
        
        return res.status(201).json('Produto Adicionado Ao carrinho com sucesso!')

    } catch (erro) {
        return res.json(`Deu erro: ${erro.message}`)
    }

}

module.exports = {
    teste,
    exibirProdutos,
    vendas
}