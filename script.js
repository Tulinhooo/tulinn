const formulario = document.getElementById("formCadastro");

const imagem = document.getElementById("imagem");

const preview = document.getElementById("preview");

const mensagem = document.getElementById("mensagem");


// Mostrar a imagem selecionada
imagem.addEventListener("change", function() {

    const arquivo = imagem.files[0];

    if (arquivo) {

        const leitor = new FileReader();

        leitor.onload = function(evento) {

            preview.innerHTML = `
                <img src="${evento.target.result}" alt="Imagem selecionada">
            `;

        };

        leitor.readAsDataURL(arquivo);
    }

});


// Salvar cadastro em TXT
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const endereco = document.getElementById("endereco").value;
    const cpf = document.getElementById("cpf").value;

    let nomeImagem = "Nenhuma imagem selecionada";

    if (imagem.files.length > 0) {
        nomeImagem = imagem.files[0].name;
    }


    const dados = `
CADASTRO DE USUÁRIO
===========================

Nome: ${nome}

E-mail: ${email}

Senha: ${senha}

Endereço: ${endereco}

CPF: ${cpf}

Imagem: ${nomeImagem}

===========================
Cadastro realizado com sucesso!
`;


    const arquivoTXT = new Blob(
        [dados],
        { type: "text/plain;charset=utf-8" }
    );


    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivoTXT);

    link.download = "cadastro.txt";

    link.click();


    URL.revokeObjectURL(link.href);


    mensagem.textContent = "Cadastro salvo com sucesso!";

    mensagem.style.color = "green";


    formulario.reset();

    preview.innerHTML = "";

});