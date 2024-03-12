// Seu código Javascript vem aqui
//Evento DOM
document.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector("*")
    console.log("el", el)

    //Criação das Arrays
    var letrasMinusculas = "abcdefghijklmnopqrstuvxyz"
    var letrasMaisculas = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
    var numeros = "0123456789"
    var simbolos = "!@#$%^&*()-_+=[]{}|;:,.<>?"
    var caracteres = ""
    
    //Variavéis das checkboxs
    var checkboxSimbolos = document.getElementById("symbols")
    var checkboxMaiusculas = document.getElementById("uppercase")
    var checkboxMinusculas = document.getElementById("lowercase")
    var checkboxNumeros = document.getElementById("numbers")

    //Criador de senha
    var geradorSenha = document.getElementById("generate")

    //Verificação do tamanho da senha
    geradorSenha.addEventListener("click", function () {
        caracteres = ""

        if (!checkboxSimbolos.checked && !checkboxMaiusculas.checked && !checkboxMinusculas.checked && !checkboxNumeros.checked) {
            alert("Por favor, selecione pelo menos uma opção para gerar a senha.")
            return
        }

        var tamanhoSenha = parseInt(document.getElementById("length").value)
        if (isNaN(tamanhoSenha) || tamanhoSenha < 4 || tamanhoSenha > 30) {
            alert("Por favor, insira um número de caracteres válido (entre 4 e 30).")
            return
        }

        //Verificação dos checkboxs
        if (checkboxSimbolos.checked) {
            caracteres += simbolos
        }
        if (checkboxMaiusculas.checked) {
            caracteres += letrasMaisculas
        }
        if (checkboxMinusculas.checked) {
            caracteres += letrasMinusculas
        }
        if (checkboxNumeros.checked) {
            caracteres += numeros
        }

        var senha = ""
        for (var i = 0; i < tamanhoSenha; i++) {
            var randomIndex = Math.floor(Math.random() * caracteres.length)
            senha += caracteres[randomIndex]
        }
        
        // Para mostrar a senha
        document.getElementById("output").textContent = senha

        // Verificar a força da senha
        var forcaSenha = calcularForcaSenha(senha)
        exibirForcaSenha(forcaSenha)
    });

    function calcularForcaSenha(senha) {
        // Quanto mais longa a senha, mais forte
        var forca = senha.length

        // Se a senha contém caracteres especiais, números, letras maiúsculas e minúsculas, adicione mais força
        if (/[!@#$%^&*()-_+=\[\]{}|;:,.<>?]/.test(senha)) forca += 10
        if (/[0-9]/.test(senha)) forca += 10
        if (/[A-Z]/.test(senha)) forca += 10
        if (/[a-z]/.test(senha)) forca += 10

        return forca
    }
    //função para exibir a força da senha
    function exibirForcaSenha(forca) {
        var indicador = document.getElementById("forcaSenha")
        var mensagem = ""

        if (forca >= 30) {
            mensagem = "Senha Forte"
            indicador.style.color = "green"
        } else if (forca >= 15) {
            mensagem = "Senha Moderada"
            indicador.style.color = "orange"
        } else {
            mensagem = "Senha Fraca"
            indicador.style.color = "red"
        }

        indicador.textContent = mensagem
    }
     // Caso o botão seja clicado, copia a senha
    var botaoCopiar = document.getElementById("copy")
    botaoCopiar.addEventListener("click", function () {
        var senhaGerada = document.getElementById("output").textContent
        // Verifica se a senha foi gerada ou não
        if (senhaGerada.trim() === "Sua senha aparecerá aqui") {
            alert("Nenhuma senha foi gerada para copiar!")
            return
        }

        // Copiar a senha para a área de transferência
        navigator.clipboard.writeText(senhaGerada)
            .then(() => {
                alert("Senha copiada para a área de transferência!")
            })
            .catch((error) => {
                console.error("Erro ao copiar senha:", error)
                alert("Não foi possível copiar a senha. Por favor, tente novamente.")
            })
    })
})
    
